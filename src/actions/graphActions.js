import { API, graphqlOperation } from "aws-amplify";
import { getUnixTime } from "date-fns";
import * as mutations from "../graphql/mutations";
import {
  ADD_GRAPH_ELEMENTS,
  REMOVE_GRAPH_ELEMENT,
  INITIALIZE_GRAPH_SESSION,
  SUBMIT_GRAPH_SESSION,
  SET_CURRENT_NODE,
} from "./types";
import {
  uniqueTokensFromEntry,
  createMissingNodes,
  createStartingNode,
  findNodesToLink,
} from "../utils";

/**
 * Submits a new `Response`, tokenizes and submits new `Nodes` and `Edges`.
 *
 * @param {string} response Raw response string
 * @throws ReferenceError if no session or current node, GraphQLException or DynamoDBException
 */
export const submitResponse = (response) => async (dispatch, getState) => {
  const { nodes, session, currentNode } = getState().graph;
  if (!session || !currentNode)
    throw new ReferenceError("No current session ID!");

  const resultResponse = await API.graphql(
    graphqlOperation(mutations.createResponse, {
      input: {
        value: response.trim(),
        responseTime: new Date() - new Date(currentNode.lastVisited),
        responseNetworkId: session,
        responseSourceId: currentNode.id,
      },
    })
  );

  const tokens = uniqueTokensFromEntry(response);
  const newNodes = createMissingNodes(
    tokens,
    nodes,
    currentNode
  ).map((node) => ({ ...node, nodeNetworkId: session }));

  let resultNodes = [];
  do {
    const batch = newNodes.splice(0, 24);
    const {
      data: { batchCreateNodes },
    } = await API.graphql(
      graphqlOperation(
        /* GraphQL */ `
          mutation BatchPutNodes($input: [CreateNodeInput!]!) {
            batchCreateNodes(input: $input) {
              id
              value
              depth
              radius
              color
              createdAt
              owner
            }
          }
        `,
        {
          input: batch,
        }
      )
    );
    batchCreateNodes && resultNodes.push(...batchCreateNodes);
  } while (newNodes.length);

  const existingNodesToLink = findNodesToLink(tokens, nodes);
  const newEdges = [...resultNodes, ...existingNodesToLink].map(({ id }) => ({
    distance: 30,
    edgeSourceId: currentNode.id,
    edgeTargetId: id,
    edgeNetworkId: session,
  }));

  let resultEdges = [];
  do {
    const batch = newEdges.splice(0, 24);
    const {
      data: { batchCreateEdges },
    } = await API.graphql(
      graphqlOperation(
        /* GraphQL */ `
          mutation BatchPutEdges($input: [CreateEdgeInput!]!) {
            batchCreateEdges(input: $input) {
              id
              source {
                value
              }
              target {
                value
              }
              createdAt
              owner
            }
          }
        `,
        {
          input: batch,
        }
      )
    );
    batchCreateEdges && resultEdges.push(...batchCreateEdges);
  } while (newEdges.length);

  dispatch({
    type: ADD_GRAPH_ELEMENTS,
    payload: {
      nodes: resultNodes,
      edges: resultEdges,
    },
  });

  dispatch(selectRandomNode());
};

/**
 * Sets the current node to a randomly selected node from the graph.
 */
export const selectRandomNode = () => (dispatch, getState) => {
  const { nodes } = getState().graph;
  const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
  dispatch({
    type: SET_CURRENT_NODE,
    payload: { ...randomNode, lastVisited: new Date() },
  });
};

/**
 * Creates a new `WordNet` with a random starting node.
 *
 * @throws GraphQLException or DynamoDBException
 */
export const initializeSession = () => async (dispatch) => {
  const {
    data: { createWordNet },
  } = await API.graphql(
    graphqlOperation(mutations.createWordNet, {
      input: { timestamp: getUnixTime(new Date()) },
    })
  );

  const nodeNetworkId = createWordNet.id;
  const input = createStartingNode(nodeNetworkId);

  const {
    data: { createNode },
  } = await API.graphql(graphqlOperation(mutations.createNode, { input }));

  const currentNode = { ...createNode, lastVisited: new Date() };
  dispatch({
    type: INITIALIZE_GRAPH_SESSION,
    payload: {
      session: nodeNetworkId,
      nodes: [currentNode],
      currentNode,
    },
  });
};

/**
 * Sets the current session to the last `WordNet` of the authenticated user.
 *
 * @return {boolean} Success status of resume // TODO: obviate this by making a proper search
 * @throws GraphQLException or DynamoDBException
 */
export const resumeLastSession = () => async (dispatch) => {
  // BUG: 'limit' does not work when the last row in table was by another user!!
  const response = await API.graphql(
    graphqlOperation(
      /* GraphQL */ `
        {
          searchWordNets(limit: 1, sort: { field: timestamp }) {
            items {
              id
              nodes(limit: 1000) {
                items {
                  id
                  value
                  depth
                  radius
                  color
                  createdAt
                  owner
                }
              }
              edges(limit: 1000) {
                items {
                  id
                  distance
                  source {
                    value
                  }
                  target {
                    value
                  }
                  createdAt
                  owner
                }
              }
              createdAt
            }
          }
        }
      `,
      {}
    )
  );

  const {
    data: {
      searchWordNets: { items },
    },
  } = response;

  if (!items.length) return false;

  dispatch({
    type: INITIALIZE_GRAPH_SESSION,
    payload: {
      nodes: items[0].nodes.items,
      edges: items[0].edges.items,
      session: items[0].id,
      currentNode: {
        ...items[0].nodes.items[
          Math.floor(Math.random() * items[0].nodes.items.length)
        ],
        lastVisited: new Date(),
      },
    },
  });

  return true;
};

/**
 * Finishes the current session and clears the working state.
 * If no responses were added, the empty `WordNet` and starting `Node` are deleted.
 *
 * @throws GraphQLException or DynamoDBException
 */
export const submitSession = () => (dispatch, getState) => {
  const { nodes, session, currentNode } = getState().graph;

  // Do not save sessions that don't have any words added!

  if (nodes.length <= 1) {
    if (currentNode?.id) dispatch(deleteNode(currentNode.id));
    dispatch(deleteWordNet(session));
  }

  dispatch({ type: SUBMIT_GRAPH_SESSION });
};

/**
 * Deletes a `WordNet`.
 *
 * @param {string} id Unique ID of an existing `WordNet`
 * @throws GraphQLException or DynamoDBException
 */
const deleteWordNet = (id) => async () => {
  const response = await API.graphql(
    graphqlOperation(
      /* GraphQL */ `
        mutation DeleteWordNet($input: DeleteWordNetInput!) {
          deleteWordNet(input: $input) {
            id
          }
        }
      `,
      { input: { id } }
    )
  );

  if (response.data.deleteWordNet) {
    // TODO: delete it's child data too!
  }
};

/**
 * Deletes a `Node`.
 *
 * @param {string} id Unique ID of an existing `Node`
 * @throws GraphQLException or DynamoDBException
 */
const deleteNode = (id) => async (dispatch) => {
  const response = await API.graphql(
    graphqlOperation(
      /* GraphQL */ `
        mutation DeleteNode($input: DeleteNodeInput!) {
          deleteNode(input: $input) {
            id
          }
        }
      `,
      { input: { id } }
    )
  );
  if (response.data.deleteNode) {
    // TODO: delete nodes that link to/from and responses from!!

    dispatch({
      type: REMOVE_GRAPH_ELEMENT,
      payload: id,
    });
  }
};

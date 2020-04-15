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
  mapEdges,
} from "../utils";

/**
 * Submits a new `Response`, tokenizes and submits new `Nodes` and `Edges`.
 *
 * @param {string} response Raw response string
 * @return {boolean} Success status of all mutations
 */
export const submitResponse = (response) => async (dispatch, getState) => {
  const { nodes, session, currentNode } = getState().graph;

  try {
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
    const newNodes = createMissingNodes(tokens, nodes, currentNode);
    // TODO: Create new mutation to add multiple nodes simultaneously
    const resultNodes = await Promise.all(
      newNodes.map((node) =>
        API.graphql(
          graphqlOperation(mutations.createNode, {
            input: { ...node, nodeNetworkId: session },
          })
        )
      )
    );

    const newResultNodesToLink = resultNodes.map((n) => n.data.createNode);
    const existingNodesToLink = findNodesToLink(tokens, nodes);

    // TODO: Create new mutation to add multiple edges simultaneously
    const resultEdges = await Promise.all(
      [...newResultNodesToLink, ...existingNodesToLink].map(({ id }) =>
        API.graphql(
          graphqlOperation(mutations.createEdge, {
            input: {
              distance: 30,
              edgeSourceId: currentNode.id,
              edgeTargetId: id,
              edgeNetworkId: session,
            },
          })
        )
      )
    );

    const newLinks = resultEdges.map(
      ({
        data: {
          createEdge: { id, source, target, distance, createdAt },
        },
      }) => ({
        id: id,
        source: source.value,
        target: target.value,
        distance,
        createdAt,
      })
    );

    dispatch({
      type: ADD_GRAPH_ELEMENTS,
      payload: {
        nodes: resultNodes.map((res) => res.data.createNode),
        links: newLinks,
      },
    });

    dispatch(selectRandomNode());
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
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
 * @return {boolean} Success status of all mutations
 */
export const initializeSession = () => async (dispatch) => {
  try {
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
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * Sets the current session to the last `WordNet` of the authenticated user.
 *
 * @return {boolean} Success status of all mutations
 */
export const resumeLastSession = () => async (dispatch) => {
  try {
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
        links: mapEdges({ edges: items[0].edges.items }),
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
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * Finishes the current session and clears the working state.
 * If no responses were added, the empty `WordNet` and starting `Node` are deleted.
 *
 * @return {boolean} Success status of all mutations
 */
export const submitSession = () => (dispatch, getState) => {
  const { nodes, session, currentNode } = getState().graph;

  // Do not save sessions that don't have any words added!
  try {
    if (nodes.length <= 1) {
      if (currentNode?.id) dispatch(deleteNode(currentNode.id));
      dispatch(deleteWordNet(session));
    }

    dispatch({ type: SUBMIT_GRAPH_SESSION });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * Deletes a `WordNet`.
 *
 * @param {string} id Unique ID of an existing `WordNet`
 */
const deleteWordNet = (id) => async () => {
  try {
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

      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * Deletes a `Node`.
 *
 * @param {string} id Unique ID of an existing `Node`
 */
const deleteNode = (id) => async (dispatch) => {
  try {
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

      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import {
  ADD_GRAPH_ELEMENTS,
  REMOVE_GRAPH_ELEMENT,
  INITIALIZE_GRAPH_SESSION,
  SUBMIT_GRAPH_SESSION,
  SET_CURRENT_NODE
} from "./types";
import {
  uniqueTokensFromEntry,
  generateMissingNodes,
  generateStartingNode,
  findNodesToLink,
  mapEdges,
  generateMissingLinks
} from "../utils";

export const submitResponse = response => async (dispatch, getState) => {
  const { nodes, links, session, currentNode } = getState().graph;
  if (!session || !currentNode) throw new Error("No current session ID!");

  const resultResponse = await API.graphql(
    graphqlOperation(mutations.createResponse, {
      input: {
        value: response,
        responseTime: new Date() - new Date(currentNode.lastVisited),
        responseNetworkId: session,
        responseSourceId: currentNode.id
      }
    })
  );

  const tokens = uniqueTokensFromEntry(response);
  const newNodes = generateMissingNodes(tokens, nodes, currentNode);
  // TODO: Create new mutation to add multiple nodes simultaneously
  const resultNodes = await Promise.all(
    newNodes.map(node =>
      API.graphql(
        graphqlOperation(mutations.createNode, {
          input: { ...node, nodeNetworkId: session }
        })
      )
    )
  );

  const newResultNodesToLink = resultNodes.map(n => n.data.createNode);
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
            edgeNetworkId: session
          }
        })
      )
    )
  );

  const newLinks = resultEdges.map(
    ({
      data: {
        createEdge: { id, source, target, distance, createdAt }
      }
    }) => ({
      id: id,
      source: source.value,
      target: target.value,
      distance,
      createdAt
    })
  );

  dispatch({
    type: ADD_GRAPH_ELEMENTS,
    payload: {
      nodes: resultNodes.map(res => res.data.createNode),
      links: newLinks
    }
  });

  dispatch(selectRandomNode());
};

export const selectRandomNode = () => (dispatch, getState) => {
  const { nodes } = getState().graph;
  const randomNode = nodes[Math.floor(Math.random() * nodes.length)];

  dispatch({
    type: SET_CURRENT_NODE,
    payload: { ...randomNode, lastVisited: new Date() }
  });
};

export const removeElement = token => {
  return {
    type: REMOVE_GRAPH_ELEMENT,
    payload: token
  };
};

export const initializeSession = () => async dispatch => {
  const {
    data: { createWordNet }
  } = await API.graphql(
    graphqlOperation(mutations.createWordNet, { input: {} })
  );

  const nodeNetworkId = createWordNet.id;
  const input = generateStartingNode(nodeNetworkId);

  const {
    data: { createNode }
  } = await API.graphql(graphqlOperation(mutations.createNode, { input }));

  const currentNode = { ...createNode, lastVisited: new Date() };
  dispatch({
    type: INITIALIZE_GRAPH_SESSION,
    payload: {
      session: nodeNetworkId,
      nodes: [currentNode],
      currentNode
    }
  });
};

export const resumeLastSession = () => async dispatch => {
  const {
    data: {
      searchWordNets: { items }
    }
  } = await API.graphql(
    graphqlOperation(
      /* GraphQL */ `
        {
          searchWordNets(limit: 1, sort: { field: createdAt }) {
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
        lastVisited: new Date()
      }
    }
  });

  return true;
};

export const submitSession = () => {
  return { type: SUBMIT_GRAPH_SESSION };
};

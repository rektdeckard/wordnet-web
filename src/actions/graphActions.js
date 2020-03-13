import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import {
  ADD_GRAPH_ELEMENTS,
  REMOVE_GRAPH_ELEMENT,
  INITIALIZE_GRAPH_SESSION,
  SUBMIT_GRAPH_SESSION,
  SET_CURRENT_NODE
} from "./types";

export const addElements = (nodes = [], links = []) => async (
  dispatch,
  getState
) => {
  const { session, currentNode } = getState().graph;
  if (!session || !currentNode) throw new Error("No current session ID!");

  // TODO: Create new mutation to add multiple nodes simultaneously
  const resultNodes = await Promise.all(
    nodes.map(({ id, radius, depth, color }) =>
      API.graphql(
        graphqlOperation(mutations.createNode, {
          input: { value: id, radius, depth, color, nodeNetworkId: session }
        })
      )
    )
  );

  // TODO: Create new mutation to add multiple edges simultaneously
  const resultEdges = await Promise.all(
    resultNodes.map(({ data: { createNode: { id } } }) =>
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

  dispatch({
    type: ADD_GRAPH_ELEMENTS,
    payload: {
      nodes: resultNodes.map(res => res.data.createNode),
      links
    }
  });

  dispatch(selectRandomNode());
};

export const selectRandomNode = () => (dispatch, getState) => {
  const { nodes, currentNode } = getState().graph;
  const randomNode = nodes[Math.floor(Math.random() * nodes.length)];

  dispatch({
    type: SET_CURRENT_NODE,
    payload: { currentNode: randomNode, previousNode: currentNode }
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

  const input = {
    value: "smart",
    radius: 12,
    depth: 1,
    color: "rgb(244, 117, 96)",
    nodeNetworkId
  };

  const {
    data: { createNode }
  } = await API.graphql(graphqlOperation(mutations.createNode, { input }));

  dispatch({
    type: INITIALIZE_GRAPH_SESSION,
    payload: {
      session: nodeNetworkId,
      currentNode: createNode
    }
  });
};

export const submitSession = () => {
  return { type: SUBMIT_GRAPH_SESSION };
};

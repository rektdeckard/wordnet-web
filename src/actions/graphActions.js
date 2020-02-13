import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";
import * as mutations from "../graphql/mutations";
import {
  ADD_GRAPH_ELEMENTS,
  REMOVE_GRAPH_ELEMENT,
  INITIALIZE_GRAPH_SESSION,
  SUBMIT_GRAPH_SESSION
} from "./types";

export const addElements = (
  session,
  currentNode,
  nodes = [],
  links = []
) => async dispatch => {
  if (!session || !currentNode) throw new Error("No current session ID!");

  const resultNodes = await Promise.all(
    nodes.map(({ id, radius, depth, color }) =>
      API.graphql(
        graphqlOperation(mutations.createNode, {
          input: { value: id, radius, depth, color, nodeNetworkId: session }
        })
      )
    )
  );

  console.log("resultNodes", resultNodes);

  const resultEdges = await Promise.all(
    resultNodes.map(({ data: { createNode: { id } } }) =>
      API.graphql(
        graphqlOperation(mutations.createEdge, {
          input: {
            distance: 30,
            edgeSourceId: currentNode.currentNodeId,
            edgeTargetId: id,
            edgeNetworkId: session
          }
        })
      )
    )
  );

  console.log("resultEdges", resultEdges);

  const randomNode =
    resultNodes.map(
      ({
        data: {
          createNode: { value, color, id, radius, depth }
        }
      }) => ({
        currentNodeId: id,
        value,
        color,
        radius,
        depth
      })
    )[Math.floor(Math.random() * resultNodes.length)] ?? currentNode;

  console.log("randomNode", randomNode);

  dispatch({
    type: ADD_GRAPH_ELEMENTS,
    payload: { nodes, links, session, currentNode: randomNode }
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

  console.log(createWordNet, createNode);

  dispatch({
    type: INITIALIZE_GRAPH_SESSION,
    payload: {
      session: nodeNetworkId,
      currentNode: { ...input, currentNodeId: createNode.id }
    }
  });
};

export const submitSession = () => {
  return { type: SUBMIT_GRAPH_SESSION };
};

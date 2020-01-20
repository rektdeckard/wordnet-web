import { ADD_GRAPH_ELEMENTS, REMOVE_GRAPH_ELEMENT } from "./types";

export const addElements = (nodes = [], links = []) => {
  return {
    type: ADD_GRAPH_ELEMENTS,
    payload: { nodes, links }
  };
};

export const removeElement = token => {
  return {
    type: REMOVE_GRAPH_ELEMENT,
    payload: token
  };
};

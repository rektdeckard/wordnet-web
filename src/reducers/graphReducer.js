import { ADD_GRAPH_ELEMENTS, REMOVE_GRAPH_ELEMENT } from "../actions/types";

const INITIAL_STATE = {
  nodes: [{ id: "smart", radius: 12, depth: 1, color: "rgb(244, 117, 96)" }],
  links: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_GRAPH_ELEMENTS:
      return {
        nodes: [...state.nodes, ...action.payload.nodes],
        links: [...state.links, ...action.payload.links]
      };
    case REMOVE_GRAPH_ELEMENT:
      const filteredNodes = state.nodes.filter(n => n.id !== action.payload);
      const filteredLinks = state.links.filter(
        l => l.source !== action.payload && l.target !== action.payload
      );
      return { nodes: filteredNodes, links: filteredLinks };
    default:
      return state;
  }
};

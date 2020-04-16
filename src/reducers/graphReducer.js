import {
  ADD_GRAPH_ELEMENTS,
  REMOVE_GRAPH_ELEMENT,
  SET_CURRENT_NODE,
  INITIALIZE_GRAPH_SESSION,
  SUBMIT_GRAPH_SESSION,
} from "../actions/types";

const INITIAL_STATE = {
  nodes: [],
  edges: [],
  session: null,
  currentNode: null,
  previousNode: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIZE_GRAPH_SESSION:
      return {
        ...INITIAL_STATE,
        ...action.payload,
      };
    case SUBMIT_GRAPH_SESSION:
      return INITIAL_STATE;
    case ADD_GRAPH_ELEMENTS:
      return {
        ...state,
        nodes: [...state.nodes, ...action.payload.nodes],
        edges: [...state.edges, ...action.payload.edges],
      };
    case REMOVE_GRAPH_ELEMENT:
      const filteredNodes = state.nodes.filter((n) => n.id !== action.payload);
      const filteredEdges = state.edges.filter(
        (edge) =>
          edge.source !== action.payload && edge.target !== action.payload
      );
      return {
        ...state,
        nodes: filteredNodes,
        edges: filteredEdges,
      };
    case SET_CURRENT_NODE:
      return {
        ...state,
        currentNode: action.payload,
        previousNode: state.currentNode,
      };
    default:
      return state;
  }
};

import {
  ADD_GRAPH_ELEMENTS,
  REMOVE_GRAPH_ELEMENT,
  INITIALIZE_GRAPH_SESSION,
  SUBMIT_GRAPH_SESSION
} from "../actions/types";

const INITIAL_STATE = {
  nodes: [],
  links: [],
  session: null,
  currentNode: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIZE_GRAPH_SESSION:
      return {
        ...INITIAL_STATE,
        session: action.payload.session,
        currentNode: action.payload.currentNode,
        nodes: [action.payload.currentNode]
      };
    case SUBMIT_GRAPH_SESSION:
      return INITIAL_STATE;
    case ADD_GRAPH_ELEMENTS:
      return {
        nodes: [...state.nodes, ...action.payload.nodes],
        links: [...state.links, ...action.payload.links],
        session: action.payload.session,
        currentNode: action.payload.currentNode ?? state.currentNode
      };
    case REMOVE_GRAPH_ELEMENT:
      const filteredNodes = state.nodes.filter(n => n.id !== action.payload);
      const filteredLinks = state.links.filter(
        l => l.source !== action.payload && l.target !== action.payload
      );
      return {
        nodes: filteredNodes,
        links: filteredLinks,
        session: state.session,
        currentNode: state.currentNode
      };
    default:
      return state;
  }
};

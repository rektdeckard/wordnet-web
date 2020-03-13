import {
  ADD_GRAPH_ELEMENTS,
  REMOVE_GRAPH_ELEMENT,
  SET_CURRENT_NODE,
  INITIALIZE_GRAPH_SESSION,
  SUBMIT_GRAPH_SESSION
} from "../actions/types";

const INITIAL_STATE = {
  nodes: [],
  links: [],
  session: null,
  currentNode: null,
  previousNode: null
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
        ...state,
        nodes: [...state.nodes, ...action.payload.nodes],
        links: [...state.links, ...action.payload.links],
      };
    case REMOVE_GRAPH_ELEMENT:
      const filteredNodes = state.nodes.filter(n => n.id !== action.payload);
      const filteredLinks = state.links.filter(
        l => l.source !== action.payload && l.target !== action.payload
      );
      return {
        ...state,
        nodes: filteredNodes,
        links: filteredLinks,
      };
    case SET_CURRENT_NODE:
      return {
        ...state,
        currentNode: action.payload.currentNode,
        previousNode: action.payload.previousNode
      }
    default:
      return state;
  }
};

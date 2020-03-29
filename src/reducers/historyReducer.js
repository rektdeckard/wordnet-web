import {
  FETCH_HISTORY,
  FETCH_SESSION,
  SET_INITIAL_DATE
} from "../actions/types";

const INITIAL_STATE = {
  currentSession: {},
  sessions: [],
  sessionsByDay: [],
  initialDate: null,
  rounds: 0,
  words: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HISTORY:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_SESSION:
      return {
        ...state,
        currentSession: action.payload
      };
    case SET_INITIAL_DATE:
      return {
        ...state,
        initialDate: action.payload
      };
    default:
      return state;
  }
};

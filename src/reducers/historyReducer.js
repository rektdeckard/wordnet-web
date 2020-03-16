import { FETCH_HISTORY, FETCH_SESSION } from "../actions/types";

const INITIAL_STATE = {
  currentSession: {},
  sessions: [],
  sessionsByDay: [],
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
    default:
      return state;
  }
};

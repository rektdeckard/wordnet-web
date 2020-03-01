import { FETCH_HISTORY } from "../actions/types";

const INITIAL_STATE = {
  sessions: [],
  sessionsByDay: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HISTORY:
      return action.payload;
    default:
      return state;
  }
};

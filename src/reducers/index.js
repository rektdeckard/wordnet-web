import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import settingsReducer from "./settingsReducer";
import graphReducer from "./graphReducer";

const rootReducer = combineReducers({
  settings: settingsReducer,
  graph: graphReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;

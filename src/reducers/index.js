import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import settingsReducer from "./settingsReducer";
import graphReducer from "./graphReducer";
import histroryReducer from "./historyReducer";

const rootReducer = combineReducers({
  settings: settingsReducer,
  graph: graphReducer,
  history: histroryReducer
});

// const store = createStore(rootReducer, {}, applyMiddleware(thunk));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

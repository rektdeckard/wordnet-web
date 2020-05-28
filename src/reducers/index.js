import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import assessmentReducer from "./assessmentReducer";
import graphReducer from "./graphReducer";
import histroryReducer from "./historyReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  assessments: assessmentReducer,
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

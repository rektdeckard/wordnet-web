import { UPDATE_SETTING, RESTORE_DEFAULTS } from "../actions/types";

const SAVED_STATE = JSON.parse(
  localStorage.getItem("settings") ?? "{}"
);

const INITIAL_STATE = {
  type: "force",
  repulsivity: 5000,
  iterations: 500,
  colorScheme: "blues",
  defaultNodeSize: 4,
  nodeScale: 2,
  fontSize: 18,
  autoScaleSpringLength: false,
  defaultSpringLength: 100,
  motionStiffness: 1000,
  motionDamping: 0.5,
  motionThreshold: 0.1,
  maxSpeed: 1000,
  animate: true,
};

export default (state = { ...INITIAL_STATE, ...SAVED_STATE }, action) => {
  switch (action.type) {
    case UPDATE_SETTING:
      return { ...state, ...action.payload };
    case RESTORE_DEFAULTS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

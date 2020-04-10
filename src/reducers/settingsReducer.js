import { UPDATE_SETTING } from "../actions/types";

const INITIAL_STATE = {
  repulsivity: 2000,
  iterations: 500,
  defaultNodeSize: 4,
  nodeScale: 2,
  autoScaleSpringLength: false,
  defaultSpringLength: 100,
  motionStiffness: 1000,
  motionDamping: 0.5,
  motionThreshold: 0.1,
  maxSpeed: 1000,
  animate: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SETTING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

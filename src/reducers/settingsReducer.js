import { UPDATE_SETTING } from "../actions/types";

const INITIAL_STATE = {
  repulsivity: 30,
  distanceMin: 1,
  distanceMax: 999,
  iterations: 90,
  borderWidth: 3,
  linkThickness: 3,
  animate: true,
  motionStiffness: 100,
  motionDamping: 10
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SETTING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

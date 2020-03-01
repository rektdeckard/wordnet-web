import { UPDATE_SETTING } from "../actions/types";

const INITIAL_STATE = {
  repulsivity: 60,
  distanceMin: 10,
  distanceMax: 500,
  iterations: 90,
  borderWidth: 2,
  linkThickness: 2,
  animate: true,
  motionStiffness: 40,
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

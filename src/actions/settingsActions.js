import { UPDATE_SETTING } from "../actions/types";

const updateSettings = settings => dispatch => {
  dispatch({
    type: UPDATE_SETTING,
    payload: settings
  });
};

// TODO: Implement extra validation on each property, even though the UI layer should it too?

export const setRepulsivity = repulsivity => dispatch => {
  dispatch(updateSettings({ repulsivity }));
};

export const setDistanceMin = distanceMin => dispatch => {
  dispatch(updateSettings({ distanceMin }));
};

export const setDistanceMax = distanceMax => dispatch => {
  dispatch(updateSettings({ distanceMax }));
};

export const setIterations = iterations => dispatch => {
  dispatch(updateSettings({ iterations }));
};

export const setBorderWidth = borderWidth => dispatch => {
  dispatch(updateSettings({ borderWidth }));
};

export const setLinkThickness = linkThickness => dispatch => {
  if (!linkThickness) linkThickness = 1;
  if (linkThickness > 20) linkThickness = 20;
  dispatch(updateSettings({ linkThickness }));
};

export const setAnimate = animate => dispatch => {
  dispatch(updateSettings({ animate }));
};

export const setMotionStiffness = motionStiffness => dispatch => {
  dispatch(updateSettings({ motionStiffness }));
};

export const setMotionDamping = motionDamping => dispatch => {
  dispatch(updateSettings({ motionDamping }));
};

import { UPDATE_SETTING } from "../actions/types";

const updateSettings = (settings) => (dispatch) => {
  dispatch({
    type: UPDATE_SETTING,
    payload: settings,
  });
};

export const setType = (type) => (dispatch) => {
  dispatch(updateSettings({ type }));
};

export const setRepulsivity = (repulsivity) => (dispatch) => {
  dispatch(updateSettings({ repulsivity }));
};

export const setIterations = (iterations) => (dispatch) => {
  dispatch(updateSettings({ iterations }));
};

export const setDefaultNodeSize = (defaultNodeSize) => (dispatch) => {
  dispatch(updateSettings({ defaultNodeSize }));
};

export const setNodeScale = (nodeScale) => (dispatch) => {
  dispatch(updateSettings({ nodeScale }));
};

export const setAutoScaleSpringLength = (autoScaleSpringLength) => (
  dispatch
) => {
  dispatch(updateSettings({ autoScaleSpringLength }));
};

export const setDefaultSpringLength = (defaultSpringLength) => (dispatch) => {
  dispatch(updateSettings({ defaultSpringLength }));
};

export const setMotionStiffness = (motionStiffness) => (dispatch) => {
  dispatch(updateSettings({ motionStiffness }));
};

export const setMotionDamping = (motionDamping) => (dispatch) => {
  dispatch(updateSettings({ motionDamping }));
};

export const setMotionThreshold = (motionThreshold) => (dispatch) => {
  dispatch(updateSettings({ motionThreshold }));
};

export const setMaxSpeed = (maxSpeed) => (dispatch) => {
  dispatch(updateSettings({ maxSpeed }));
};
export const setAnimate = (animate) => (dispatch) => {
  dispatch(updateSettings({ animate }));
};

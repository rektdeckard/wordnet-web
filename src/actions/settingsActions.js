import { UPDATE_SETTING, RESTORE_DEFAULTS } from "../actions/types";

const updateSettings = (settings) => (dispatch) => {
  dispatch({
    type: UPDATE_SETTING,
    payload: settings,
  });
};

/**
 * Sets the layout method used by the graph.
 *
 * @param {"force" | "circle" | "concentric" | "grid" | "radial" | "dagre" | "random"} type Layout method
 */
export const setType = (type) => (dispatch) => {
  dispatch(updateSettings({ type }));
};

/**
 * Sets the electrostatic force of nodes in the graph.
 *
 * @param {number} repulsivity
 */
export const setRepulsivity = (repulsivity) => (dispatch) => {
  dispatch(updateSettings({ repulsivity }));
};

/**
 * Sets the length of the simulation, after which physics will freeze.
 *
 * @param {number} iterations Maximum number of animation frames to render
 */
export const setIterations = (iterations) => (dispatch) => {
  dispatch(updateSettings({ iterations }));
};

/**
 * Sets the color scheme used by the graph.
 *
 * @param {"blues" | "tealblues" | "teals" | "greens" | "browns" | "oranges" | "reds" | "purples" | "warmgreys" |"greys" | "viridis" | "inferno" | "plasma" | "lightgreyred" | "lightgreyteal" | "lightmulti" | "lightorange" | "lighttealblue" | "bluegreen" | "bluepurple" | "goldgreen" | "goldred" | "greenblue" | "purplebluegreen" | "purpleblue" | "purplered" | "redpurple" | "yellowgreenblue" | "yellowgreen" | "yelloworangebrown" | "yelloworangered" | "blueorange" | "brownbluegreen" | "purplegreen" | "pinkyellowgreen" | "purpleorange" | "redblue" | "redgrey" | "redyellowblue" | "redyellowgreen" | "spectral" | "rainbow" | "sinebow"} colorScheme d3-scheme names
 */
export const setColorScheme = (colorScheme) => (dispatch) => {
  dispatch(updateSettings({ colorScheme }));
};

/**
 * Sets the default node size used by the graph.
 * Size is calculated as: `(degree * nodeScale) + defaultNodeSize`.
 *
 * @param {number} defaultNodeSize Radius of degree-zero nodes
 */
export const setDefaultNodeSize = (defaultNodeSize) => (dispatch) => {
  dispatch(updateSettings({ defaultNodeSize }));
};

/**
 * Sets the factor by which node size scales with its degree.
 * Size is calculated as: `(degree * nodeScale) + defaultNodeSize`.
 *
 * @param {number} nodeScale Degree scale factor
 */
export const setNodeScale = (nodeScale) => (dispatch) => {
  dispatch(updateSettings({ nodeScale }));
};

/**
 * Sets the font size used for graph labels.
 *
 * @param {number} fontSize Size in `pt`
 */
export const setFontSize = (fontSize) => (dispatch) => {
  dispatch(updateSettings({ fontSize }));
};

/**
 * Sets whether the edge length is scaled by the size of the graph, or by `defaultSpringLength`.
 * Length is calculated as: `(nodes.length + edges.length) / 2`.
 *
 * @param {boolean} autoScaleSpringLength
 */
export const setAutoScaleSpringLength = (autoScaleSpringLength) => (
  dispatch
) => {
  dispatch(updateSettings({ autoScaleSpringLength }));
};

/**
 * Sets the starting length of edges in the graph.
 *
 * @param {number} defaultSpringLength Base length in `pt`
 */
export const setDefaultSpringLength = (defaultSpringLength) => (dispatch) => {
  dispatch(updateSettings({ defaultSpringLength }));
};

/**
 * Sets the spring coefficient of edges in the graph.
 *
 * @param {number} motionStiffness Spring coefficient [0, 10000]
 */
export const setMotionStiffness = (motionStiffness) => (dispatch) => {
  dispatch(updateSettings({ motionStiffness }));
};

/**
 * Sets the degree to which motion is reduced over time.
 *
 * @param {number} motionDamping Damping ratio
 */
export const setMotionDamping = (motionDamping) => (dispatch) => {
  dispatch(updateSettings({ motionDamping }));
};

/**
 * Sets the minimum energy of the simulation, below which motion will stop.
 *
 * @param {number} motionThreshold Minimum energy [0, 1]
 */
export const setMotionThreshold = (motionThreshold) => (dispatch) => {
  dispatch(updateSettings({ motionThreshold }));
};

/**
 * Sets the maximum speed at which graph elements may move.
 *
 * @param {number} maxSpeed `pts`/sec [0, 1000]
 */
export const setMaxSpeed = (maxSpeed) => (dispatch) => {
  dispatch(updateSettings({ maxSpeed }));
};

/**
 * Sets whether graph elements should animate in on load.
 *
 * @param {boolean} animate This only affects the initial load
 */
export const setAnimate = (animate) => (dispatch) => {
  dispatch(updateSettings({ animate }));
};

/**
 * Clears the `localStorage` settings cache and returns graph parameters to defaults.
 */
export const restoreDefaults = () => {
  localStorage.setItem("settings", null);
  return { type: RESTORE_DEFAULTS };
};

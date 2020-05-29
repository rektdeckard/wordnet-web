import {
  UPDATE_GRID,
  UPDATE_SHAPES,
  UPDATE_TIMELINE,
  UPDATE_SELF_IDENTIFY,
  UPDATE_DESCRIPTION,
  INITIALIZE_SELF_IDENTIFY,
} from "./types";
import { Storage } from "aws-amplify";

export const updateGrid = (grid) => {
  return {
    type: UPDATE_GRID,
    payload: grid,
  };
};

export const updateShapes = (fromGroup, toGroup, item) => {
  if (fromGroup === toGroup) return { type: null };

  return {
    type: UPDATE_SHAPES,
    payload: { fromGroup, toGroup, item },
  };
};

export const initializeTimeline = () => async (dispatch) => {
  const images = await Storage.list("pictograms", {
    level: "public",
  });
  const pictographs = await Promise.all(
    images
      .filter((it) => it.key.endsWith(".svg"))
      .map(async (image) => {
        const imageURL = await Storage.get(image.key);
        return {
          name: image.key.split(/\W/)[2]?.replace(/_/g, " "),
          src: imageURL,
          id: image.eTag,
        };
      })
  );

  dispatch(updateTimeline(pictographs.slice(0, 24)));
};

export const updateTimeline = (timeline) => {
  return {
    type: UPDATE_TIMELINE,
    payload: timeline,
  };
};

export const initializeSelfIdentify = () => async (dispatch) => {
  const images = await Storage.list("pictograms/selfIdentify", {
    level: "public",
  });
  const pictographs = await Promise.all(
    images
      .filter((it) => it.key.endsWith(".svg"))
      .map(async (image) => {
        const imageURL = await Storage.get(image.key);
        return {
          name: image.key.split(/\W/)[2]?.replace(/_/g, " "),
          src: imageURL,
          id: image.eTag,
        };
      })
  );

  dispatch({
    type: INITIALIZE_SELF_IDENTIFY,
    payload: pictographs,
  });
};

export const updateSelfIdentify = (fromGroup, toGroup, item) => {
  if (fromGroup === toGroup) return { type: null };

  return {
    type: UPDATE_SELF_IDENTIFY,
    payload: { fromGroup, toGroup, item },
  };
};

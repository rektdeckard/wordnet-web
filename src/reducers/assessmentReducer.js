import {
  UPDATE_GRID,
  UPDATE_SHAPES,
  UPDATE_TIMELINE,
  INITIALIZE_SELF_IDENTIFY,
  UPDATE_SELF_IDENTIFY,
  UPDATE_DESCRIPTION,
} from "../actions/types";
import { Color } from "../data/constants";

const GRID_ROWS = 4;
const GRID_COLUMNS = 4;
const INITIAL_GRID = new Array(GRID_ROWS)
  .fill(null)
  .map(() => new Array(GRID_COLUMNS).fill(null));

const INITIAL_SHAPES = [
  { id: 1, poly: "circle", size: 150, color: Color.ACTIVE },
  { id: 2, poly: "circle", size: 100, color: Color.ACTIVE },
  { id: 3, poly: "circle", size: 100, color: Color.POSITIVE },
  { id: 4, poly: "circle", size: 100, color: Color.POSITIVE },
  { id: 5, poly: "circle", size: 50, color: Color.NEGATIVE },
  { id: 6, poly: "square", size: 150, color: Color.NEGATIVE },
  { id: 7, poly: "square", size: 100, color: Color.NEGATIVE },
  { id: 8, poly: "square", size: 50, color: Color.ACTIVE },
  { id: 9, poly: "triangle", size: 150, color: Color.ACTIVE },
  { id: 10, poly: "triangle", size: 100, color: Color.NEGATIVE },
  { id: 11, poly: "triangle", size: 100, color: Color.NEGATIVE },
  { id: 12, poly: "triangle", size: 50, color: Color.POSITIVE },
];

for (let i = INITIAL_SHAPES.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = INITIAL_SHAPES[i];
  INITIAL_SHAPES[i] = INITIAL_SHAPES[j];
  INITIAL_SHAPES[j] = temp;
}

const INITIAL_STATE = {
  gridAssessment: INITIAL_GRID,
  shapeDiscrimination: {
    remainingShapes: INITIAL_SHAPES,
    groupAShapes: [],
    groupBShapes: [],
    groupCShapes: [],
  },
  timelineAssessment: [],
  selfIdentify: {
    remainingPictographs: [],
    self_: [],
    selfAndOthers: [],
    selfAndDesired: [],
    others: [],
    othersAndDesired: [],
    desired: [],
  },
  descriptionAssessment: [],
};

export default (state = INITIAL_STATE, action) => {
  const moveItem = (stateKey, payload) => {
    const { fromGroup = "fromGroup", toGroup = "toGroup", item = {} } = payload;
    const subState = state[stateKey];
    return {
      ...state,
      [stateKey]: {
        ...subState,
        [fromGroup]:
          subState[fromGroup]?.filter((it) => it.id !== item.id) ?? [],
        [toGroup]: [...(subState[toGroup] ?? []), item],
      },
    };
  };

  switch (action.type) {
    case UPDATE_GRID:
      return {
        ...state,
        gridAssessment: action.payload,
      };
    case UPDATE_SHAPES:
      return moveItem("shapeDiscrimination", action.payload);
    case UPDATE_TIMELINE:
      return {
        ...state,
        timelineAssessment: action.payload,
      };
    case INITIALIZE_SELF_IDENTIFY:
      return {
        ...state,
        selfIdentify: {
          ...state.selfIdentify,
          remainingPictographs: action.payload,
        },
      };
    case UPDATE_SELF_IDENTIFY:
      return moveItem("selfIdentify", action.payload);
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        descriptionAssessment: action.payload,
      };
    default:
      return state;
  }
};

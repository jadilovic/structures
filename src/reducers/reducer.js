// src/reducers/reducer.js

import { CREATE_STRUCTURE, DATA_LOADED } from "../constants/action-types";

const initialState = {
  structures: [],
  remoteStructures: [],
};

let count = 0;

function rootReducer(state = initialState, action) {
  if (action.type === CREATE_STRUCTURE) {
    return {
      ...state,
      structures: state.structures.concat({
        ...action.payload,
        id: count++,
      }),
    };
  } else if (action.type === DATA_LOADED) {
    return {
      ...state,
      remoteStructures: state.remoteStructures.concat(action.payload),
    };
  }
  return state;
}

export default rootReducer;

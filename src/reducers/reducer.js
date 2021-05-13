// src/reducers/reducer.js

import {
  CREATE_STRUCTURE,
  DATA_LOADED,
  INDIVIDUAL_STRUCTURE,
  LOG_OUT,
} from "../constants/action-types";

const initialState = {
  structures: [],
  remoteStructures: [],
  individualStru: {},
  isAuth: false,
};

let count = 0;

function rootReducer(state = initialState, action) {
  console.log(action);
  if (action.type === CREATE_STRUCTURE) {
    return {
      ...state,
      structures: state.structures.concat({
        ...action.payload,
        id: count++,
      }),
    };
  } else if (action.type === INDIVIDUAL_STRUCTURE) {
    console.log(action.payload);
    return {
      ...state,
      individualStru: action.payload,
    };
  } else if (action.type === DATA_LOADED) {
    console.log(action);
    return {
      ...state,
      remoteStructures: state.remoteStructures.concat(action.payload),
      isAuth: true,
    };
  } else if (action.type === LOG_OUT) {
    console.log(action);
    localStorage.removeItem("user");
    return {
      ...state,
      isAuth: false,
    };
  }
  console.log(action);
  return state;
}

export default rootReducer;

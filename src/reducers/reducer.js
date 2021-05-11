// src/reducers/reducer.js

import {
  CREATE_STRUCTURE,
  DATA_LOADED,
  LOG_OUT,
} from "../constants/action-types";

const initialState = {
  structures: [],
  remoteStructures: [],
  isAuth: false,
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
      isAuth: true,
    };
  } else if (action.type === LOG_OUT) {
    localStorage.removeItem("user");
    return {
      ...state,
      isAuth: false,
    };
  }
  return state;
}

export default rootReducer;

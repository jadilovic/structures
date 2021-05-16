// src/reducers/reducer.js

import axios from "axios";
import {
  CREATE_STRUCTURE,
  DATA_LOADED,
  INDIVIDUAL_STRUCTURE,
} from "../constants/action-types";
import authHeader from "../service/auth-header";

const initialState = {
  structures: [],
  individualStru: {},
  isAuth: false,
};

function RootReducer(state = initialState, action) {
  // CREATING STRUCTURE BUT GETTING BAD REQUEST ERROR
  if (action.type === CREATE_STRUCTURE) {
    axios
      .post("/api/structures", action.payload, {
        headers: authHeader(),
      })
      .then(function (response) {
        console.log("CREATED STRUCTURE");
      })
      .catch(function (error) {
        console.log("ERROR CRATING STRUCTURE");
        console.log(error);
        return;
      });
    // SELECTING INDIVIDUAL STRUCTURE SAVING IN STORE
  } else if (action.type === INDIVIDUAL_STRUCTURE) {
    console.log(action.payload);
    return {
      ...state,
      individualStru: action.payload,
    };
    // SAVING API DATA IN STORE
  } else if (action.type === DATA_LOADED) {
    console.log(action.payload);
    return {
      ...state,
      structures: state.structures.concat(action.payload),
      isAuth: true,
    };
  }
  return state;
}

export default RootReducer;

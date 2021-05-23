// src/reducers/reducer.js

import axios from "axios";
import {
  CREATE_STRUCTURE,
  DATA_LOADED,
  DISPLAY_STRUCTURE,
  DELETE_STRUCTURE,
} from "../constants/action-types";
import authHeader from "../service/auth-header";

const initialState = {
  structures: [],
  individualStructure: {},
  isAuth: false,
  loading: true,
  error: null,
};

function RootReducer(state = initialState, action) {
  // CREATING STRUCTURE IN API
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
        console.log(error.response.data);
        return;
      });
    // SELECTING INDIVIDUAL STRUCTURE SAVING IN STORE
  } else if (action.type === DISPLAY_STRUCTURE) {
    console.log(action.payload);
    return {
      ...state,
      individualStructure: action.payload,
    };
    // SAVING API DATA IN STORE
  } else if (action.type === DATA_LOADED) {
    console.log(action.payload);
    return {
      ...state,
      structures: action.payload,
      isAuth: true,
      loading: false,
    };
    // DELETING SELECTED STRUCTURE
  } else if (action.type === DELETE_STRUCTURE) {
    console.log(action.payload);
    axios
      .delete("/api/structures/" + action.payload, {
        headers: authHeader(),
      })
      .then((response) => {
        // setStatus("Delete successful");
        console.log("Delete successful");
      })
      .catch((error) => {
        //setErrorMessage(error.message);
        console.log("There was an error!", error);
      });
  }
  return state;
}

export default RootReducer;

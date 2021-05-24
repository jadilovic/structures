// src/reducers/reducer.js

import axios from "axios";
import {
  CREATE_STRUCTURE,
  CLEAR_DATA,
  DISPLAY_STRUCTURE,
  DELETE_STRUCTURE,
  LOAD_STRUCTURES,
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
    return {
      ...state,
      individualStructure: action.payload,
    };
    // SAVING API DATA IN STORE
  } else if (action.type === LOAD_STRUCTURES) {
    console.log("REDUCER LOADING STRUCTURES");
    return {
      ...state,
      structures: action.payload,
      loading: false,
    };
    // DELETING SELECTED STRUCTURE
  } else if (action.type === CLEAR_DATA) {
    console.log("CLEAR DATA");
    return {
      ...state,
      structures: [],
      isAuth: true,
      loading: true,
    };
    // DELETING SELECTED STRUCTURE
  } else if (action.type === DELETE_STRUCTURE) {
    console.log("DELETE STRUCTURE");
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

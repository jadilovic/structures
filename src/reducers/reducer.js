// src/reducers/reducer.js

import axios from "axios";
import {
  CREATE_STRUCTURE,
  CLEAR_DATA,
  DISPLAY_STRUCTURE,
  DELETE_STRUCTURE,
  LOAD_STRUCTURES,
  LOAD_MACHINES,
  DISPLAY_MACHINE,
  SET_AUTHORIZED,
  LOAD_INDIVIDUAL_MACHINE,
} from "../constants/action-types";
import authHeader from "../service/auth-header";

const initialState = {
  structures: [],
  individualStructure: {},
  machines: [],
  individualMachine: {},
  isAuth: false,
  loading: true,
  error: null,
};

function RootReducer(state = initialState, action) {
  if (action.type === CREATE_STRUCTURE) {
    // CREATING STRUCTURE IN API
    axios
      .post("/api/structures", action.payload, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("CREATED STRUCTURE");
      })
      .catch((error) => {
        console.log("ERROR CRATING STRUCTURE");
        console.log(error.response.data);
      });
  } else if (action.type === SET_AUTHORIZED) {
    // SAVING AUTHORIZATION IN STORE
    return {
      ...state,
      isAuth: action.payload,
    };
  } else if (action.type === DISPLAY_STRUCTURE) {
    // DISPLAYING INDIVIDUAL STRUCTURE AND SAVING IN STORE
    return {
      ...state,
      individualStructure: action.payload,
    };
  } else if (action.type === LOAD_STRUCTURES) {
    console.log("REDUCER LOAD STRUCTURES");
    // SAVING DOWNLOADED API STRUCTURES DATA IN STORE
    return {
      ...state,
      structures: action.payload,
      loading: false,
    };
  } else if (action.type === LOAD_MACHINES) {
    console.log("REDUCER LOAD MACHINES");
    // SAVING DOWNLOADED API MACHINES DATA IN STORE
    return {
      ...state,
      machines: action.payload,
      loading: false,
    };
  } else if (action.type === DISPLAY_MACHINE) {
    // DISPLAYING INDIVIDUAL MACHINE
    console.log("DISPLAY MACHINE REDUCER");
    return {
      ...state,
      individualMachine: action.payload,
    };
  } else if (action.type === LOAD_INDIVIDUAL_MACHINE) {
    console.log("LOAD IND MACHINE REDUCER");
    // SAVING INDIVIDUAL MACHINE IN STORE
    return {
      ...state,
      individualMachine: action.payload,
    };
  } else if (action.type === CLEAR_DATA) {
    console.log("CLEAR DATA");
    // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
    return {
      ...state,
      structures: [],
      machines: [],
      individualMachine: {},
      individualStructure: {},
      isAuth: true,
      loading: true,
    };
    // DELETING SELECTED STRUCTURE
  } else if (action.type === DELETE_STRUCTURE) {
    console.log("DELETE STRUCTURE");
    axios
      .delete(`/api/structures/${action.payload}`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("Delete successful");
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  }
  return state;
}

export default RootReducer;

// src/actions/creator.js

import {
  CREATE_STRUCTURE,
  DATA_LOADED,
  LOG_OUT,
  INDIVIDUAL_STRUCTURE,
} from "../constants/action-types";
import axios from "axios";
import authHeader from "../service/auth-header";

export function createStructure(payload) {
  return { type: CREATE_STRUCTURE, payload };
}

export function individualStructure(payload) {
  console.log(payload);
  return { type: INDIVIDUAL_STRUCTURE, payload };
}

export function getData() {
  return function (dispatch) {
    return axios
      .get("/api/structures", {
        headers: authHeader(),
      })
      .then(function (response) {
        console.log(response.data);
        dispatch({ type: DATA_LOADED, payload: response.data });
      });
  };
}

export function logout() {
  return { type: LOG_OUT };
}

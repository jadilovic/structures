// src/actions/creator.js

import { CREATE_STRUCTURE, DATA_LOADED } from "../constants/action-types";
import axios from "axios";
import authHeader from "../service/auth-header";

export function createStructure(payload) {
  return { type: CREATE_STRUCTURE, payload };
}

export function getData() {
  return function (dispatch) {
    return axios
      .get("/api/structures", {
        headers: authHeader(),
      })
      .then(function (response) {
        console.log(response.data);
        //return fetch("https://jsonplaceholder.typicode.com/posts")
        //  .then((response) => response.json())
        //  .then((json) => {
        dispatch({ type: DATA_LOADED, payload: response.data });
      });
  };
}

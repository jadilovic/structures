// src/actions/creator.js

import {
  CREATE_STRUCTURE,
  DATA_LOADED,
  DISPLAY_STRUCTURE,
  DELETE_STRUCTURE,
} from "../constants/action-types";

export function createStructure(payload) {
  console.log(payload);
  return { type: CREATE_STRUCTURE, payload };
}

export function displayStructure(payload) {
  console.log(payload);
  return { type: DISPLAY_STRUCTURE, payload };
}

export function setStructures(payload) {
  console.log(payload);
  return { type: DATA_LOADED, payload };
}

export function deleteStructure(payload) {
  console.log(payload);
  return { type: DELETE_STRUCTURE, payload };
}

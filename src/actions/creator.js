// src/actions/creator.js

import {
  CREATE_STRUCTURE,
  LOAD_STRUCTURES,
  CLEAR_DATA,
  DISPLAY_STRUCTURE,
  DELETE_STRUCTURE,
} from "../constants/action-types";
import useStructures from "./useStructures";

export function createStructure(payload) {
  console.log(payload);
  return { type: CREATE_STRUCTURE, payload };
}

export function displayStructure(payload) {
  console.log(payload);
  return { type: DISPLAY_STRUCTURE, payload };
}

export function loadStructures(payload) {
  console.log("CREATOR LOAD STRUCTURES");
  return { type: LOAD_STRUCTURES, payload };
}

export function deleteStructure(payload) {
  console.log(payload);
  return { type: DELETE_STRUCTURE, payload };
}

export function clearData() {
  return { type: CLEAR_DATA };
}

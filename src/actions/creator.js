// src/actions/creator.js

import {
  CREATE_STRUCTURE,
  DATA_LOADED,
  INDIVIDUAL_STRUCTURE,
} from "../constants/action-types";

export function createStructure(payload) {
  return { type: CREATE_STRUCTURE, payload };
}

export function individualStructure(payload) {
  console.log(payload);
  return { type: INDIVIDUAL_STRUCTURE, payload };
}

export function setStructures(payload) {
  return { type: DATA_LOADED, payload };
}

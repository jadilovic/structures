// src/actions/creator.js

import {
  CREATE_STRUCTURE,
  LOAD_STRUCTURES,
  CLEAR_DATA,
  DISPLAY_STRUCTURE,
  DISPLAY_MACHINE,
  DELETE_STRUCTURE,
  LOAD_MACHINES,
  SET_AUTHORIZED,
} from "../constants/action-types";

export function setAuthorized(payload) {
  console.log("SET AUTHORIZED");
  return { type: SET_AUTHORIZED, payload };
}

export function createStructure(payload) {
  console.log(payload);
  return { type: CREATE_STRUCTURE, payload };
}

export function displayStructure(payload) {
  return { type: DISPLAY_STRUCTURE, payload };
}

export function displayMachine(payload) {
  return { type: DISPLAY_MACHINE, payload };
}

export function loadStructures(payload) {
  console.log("CREATOR LOAD STRUCTURES");
  return { type: LOAD_STRUCTURES, payload };
}

export function loadMachines(payload) {
  console.log("CREATOR LOAD MACHINES");
  return { type: LOAD_MACHINES, payload };
}

export function deleteStructure(payload) {
  console.log(payload);
  return { type: DELETE_STRUCTURE, payload };
}

export function clearData() {
  return { type: CLEAR_DATA };
}

// src/actions/creator.js

import {
  CREATE_STRUCTURE,
  LOAD_STRUCTURES,
  CLEAR_DATA,
  DISPLAY_STRUCTURE,
  DISPLAY_MACHINE,
  DELETE_STRUCTURE,
  DELETE_MACHINE,
  LOAD_MACHINES,
  LOAD_MACHINE_TYPES,
  CREATE_MACHINE,
  SET_AUTHORIZED,
  DISPLAY_SENSOR,
  LOAD_SENSORS,
  CREATE_SENSOR,
  LOAD_INDIVIDUAL_MACHINE,
} from '../constants/action-types';

export function setAuthorized(payload) {
  return { type: SET_AUTHORIZED, payload };
}

export function createStructure(payload) {
  return { type: CREATE_STRUCTURE, payload };
}

export function displayStructure(payload) {
  return { type: DISPLAY_STRUCTURE, payload };
}

export function displayMachine(payload) {
  return { type: DISPLAY_MACHINE, payload };
}

export function loadStructures(payload) {
  return { type: LOAD_STRUCTURES, payload };
}

export function loadMachines(payload) {
  return { type: LOAD_MACHINES, payload };
}

export function loadMachineTypes(payload) {
  return { type: LOAD_MACHINE_TYPES, payload };
}

export function createMachine(payload) {
  return { type: CREATE_MACHINE, payload };
}

export function loadIndividualMachine(payload) {
  return { type: LOAD_INDIVIDUAL_MACHINE, payload };
}

export function displaySensor(payload) {
  return { type: DISPLAY_SENSOR, payload };
}

export function loadSensors(payload) {
  return { type: LOAD_SENSORS, payload };
}

export function createSensor(payload) {
  return { type: CREATE_SENSOR, payload };
}

export function deleteStructure(payload) {
  return { type: DELETE_STRUCTURE, payload };
}

export function deleteMachine(payload) {
  return { type: DELETE_MACHINE, payload };
}

export function clearData() {
  return { type: CLEAR_DATA };
}

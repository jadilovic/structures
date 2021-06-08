// src/reducers/reducer.js

import axios from 'axios';
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
  LOAD_MACHINE_TYPES,
  CREATE_MACHINE,
  LOAD_SENSORS,
  DISPLAY_SENSOR,
  CREATE_SENSOR,
} from '../constants/action-types';
import authHeader from '../service/auth-header';

const initialState = {
  structures: [],
  individualStructure: {},
  machines: [],
  machineTypes: [],
  individualMachine: {},
  sensors: [],
  isAuth: false,
  loading: true,
  error: null,
};

function RootReducer(state = initialState, action) {
  if (action.type === CREATE_STRUCTURE) {
    // CREATING STRUCTURE IN API
    console.log(action.payload);
    axios
      .post('/api/structures', action.payload, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('CREATED STRUCTURE');
      })
      .catch((error) => {
        console.log('ERROR CRATING STRUCTURE');
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
    console.log('REDUCER LOAD STRUCTURES');
    // SAVING DOWNLOADED API STRUCTURES DATA IN STORE
    return {
      ...state,
      structures: action.payload,
      loading: false,
    };
  } else if (action.type === LOAD_MACHINES) {
    console.log('REDUCER LOAD MACHINES');
    // SAVING DOWNLOADED API MACHINES DATA IN STORE
    return {
      ...state,
      machines: action.payload,
      loading: false,
    };
  } else if (action.type === LOAD_MACHINE_TYPES) {
    console.log('REDUCER LOAD MACHINE TYPES');
    // SAVING DOWNLOADED API MACHINE TYPES DATA IN STORE
    return {
      ...state,
      machineTypes: action.payload,
      loading: false,
    };
  } else if (action.type === DISPLAY_MACHINE) {
    // DISPLAYING INDIVIDUAL MACHINE
    console.log('DISPLAY MACHINE REDUCER');
    return {
      ...state,
      individualMachine: action.payload,
    };
  } else if (action.type === LOAD_INDIVIDUAL_MACHINE) {
    console.log('LOAD IND MACHINE REDUCER');
    // SAVING INDIVIDUAL MACHINE IN STORE
    return {
      ...state,
      individualMachine: action.payload,
    };
  } else if (action.type === CREATE_MACHINE) {
    // CREATING MACHINE IN API
    console.log(action.payload);
    axios
      .post('/api/machines', action.payload, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('CREATED MACHINE');
      })
      .catch((error) => {
        console.log('ERROR CRATING MACHINE');
        console.log(error.response.data);
      });
  } else if (action.type === CREATE_SENSOR) {
    // CREATING MACHINE IN API
    console.log(action.payload);
    axios
      .post('/api/sensors', action.payload, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('CREATED SENSOR');
      })
      .catch((error) => {
        console.log('ERROR CRATING SENSOR');
        console.log(error.response.data);
      });
  } else if (action.type === LOAD_SENSORS) {
    console.log('REDUCER LOAD SENSORS');
    // SAVING DOWNLOADED API SENSORS DATA IN STORE
    return {
      ...state,
      sensors: action.payload,
      loading: false,
    };
  } else if (action.type === DISPLAY_SENSOR) {
    // DISPLAYING INDIVIDUAL STRUCTURE AND SAVING IN STORE
    return {
      ...state,
      individualSensor: action.payload,
    };
  } else if (action.type === CLEAR_DATA) {
    console.log('CLEAR DATA');
    // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
    return {
      ...state,
      structures: [],
      machines: [],
      machineTypes: [],
      sensors: [],
      individualMachine: {},
      individualStructure: {},
      individualSensor: {},
      isAuth: true,
      loading: true,
    };
    // DELETING SELECTED STRUCTURE
  } else if (action.type === DELETE_STRUCTURE) {
    console.log('DELETE STRUCTURE');
    axios
      .delete(`/api/structures/${action.payload}`, {
        headers: authHeader(),
      })
      .then(() => {
        console.log('Delete successful');
      })
      .catch((error) => {
        console.log('There was an error!', error);
      });
  }
  return state;
}

export default RootReducer;

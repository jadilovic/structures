// src/middleware/wordMiddleware.js

import {
  LOAD_INDIVIDUAL_MACHINE,
  DISPLAY_MACHINE,
} from "../../constants/action-types";

import axios from "axios";
import authHeader from "../../service/auth-header";
import { displayMachine } from "../creator";

export function individualMachineMiddleware({ dispatch }) {
  console.log("MIDDLE WARE !");
  return function (next) {
    return function (action) {
      // do your stuff
      if (action.type === LOAD_INDIVIDUAL_MACHINE) {
        axios
          .get(`/api/machines/${action.payload}?populate=sensors`, {
            headers: authHeader(),
          })
          .then((response) => {
            console.log("MIDDLE WARE");
            displayMachine(response.data);
            console.log(response.data);
            return dispatch({ type: DISPLAY_MACHINE, payload: response.data });
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
            console.log(error);
          });
      }
      return next(action);
    };
  };
}

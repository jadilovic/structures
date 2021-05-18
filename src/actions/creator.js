// src/actions/creator.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CREATE_STRUCTURE,
  DATA_LOADED,
  DISPLAY_STRUCTURE,
} from "../constants/action-types";

export function createStructure(payload) {
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

// src/store/methods.js

import store from "./cloud";
import { createStructure } from "../actions/creator";

window.store = store;
window.createStructure = createStructure;

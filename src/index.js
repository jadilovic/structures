// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combinedReducers from "./reducers/index";
import "./index.css";
import App from "./App";

// Create store using root reducer
const store = createStore(combinedReducers, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

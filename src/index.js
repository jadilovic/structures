// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/reducer";
import "./index.css";
import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";

//Create store using root reducer
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

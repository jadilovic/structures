// src/index.js

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/cloud";
import App from "./App";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/*
import { createStructure } from "./actions/creator";
import store from "./store/cloud";
import index from "./store/methods";

console.log(store.getState());
store.subscribe(() => console.log("Look ma, Redux!!"));
store.dispatch(
  createStructure({ title: "React Redux Tutorial for Beginners", id: 1 })
);
console.log(store.getState());
*/

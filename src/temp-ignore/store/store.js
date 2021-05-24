// src/store/cloud.js

// NOT USED STORE
// NOT USED STORE
// NOT USED STORE

import { createStore } from "redux";
// applyMiddleware, compose
import rootReducer from "../reducers/reducer";
//import { forbiddenWordsMiddleware } from "../middleware/wordMiddleware";
//import thunk from "redux-thunk";

//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(
//  rootReducer + window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__()
// storeEnhancers(applyMiddleware(forbiddenWordsMiddleware, thunk))
//);

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

export default store;

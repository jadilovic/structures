import { combineReducers } from "redux";
import RootReducer from "./reducer";
import snackbarReducer from "./snackbarReducer";

console.log("Combine");
export default combineReducers({
  main: RootReducer,
  snackbar: snackbarReducer,
});

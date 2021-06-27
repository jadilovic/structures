import { combineReducers } from 'redux';
import RootReducer from './reducer';
import snackbarReducer from './snackbarReducer';

export default combineReducers({
  main: RootReducer,
  snackbar: snackbarReducer,
});

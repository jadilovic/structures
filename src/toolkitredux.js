import {
  configureStore,
  getDefaultMiddleware,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

/*
const fetchLinksRequest = createAction("FETCH_LINKS_REQUEST");
const fetchLinksSuccess = createAction("FETCH_LINKS_SUCCESS");

const loginSuccess = createAction("LOGIN_SUCCESS");
// Calls the action creator
store.dispatch(loginSuccess("aPayload"));
const loginFailed = createAction("LOGIN_FAILED");
*/

const authState = {
  token: "",
  error: "",
};

/*
const authReducer = createReducer(authState, {
  [loginSuccess]: (state, action) => {
    state.token = action.payload;
  },
  [loginFailed]: (state, action) => {
    state.error = action.payload;
  },
});
*/

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { loginSuccess, loginFailed } = authSlice.actions;
const authReducer = authSlice.reducer;

const middleware = [
  ...getDefaultMiddleware(),
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware,
});

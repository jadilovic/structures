// src/components/App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Home, PrivateRoute, Error } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact={true}>
          <Home />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// src/components/App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, Error } from "./pages";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./temp-folder/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact={true}>
          <Home></Home>
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

// src/components/App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { HeaderDrawer, PrivateRoute } from "./views";
import Snackbar from "./components/Snackbar";

function App() {
  return (
    <Router>
      <Snackbar />
      <HeaderDrawer />
      <Switch>
        <PrivateRoute path="/" exact />
      </Switch>
    </Router>
  );
}

export default App;

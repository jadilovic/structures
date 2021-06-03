// src/components/App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { HeaderDrawer, PrivateRoute } from "./views";

function App() {
  return (
    <Router>
      <HeaderDrawer />
      <Switch>
        <PrivateRoute path="/" exact />
      </Switch>
    </Router>
  );
}

export default App;

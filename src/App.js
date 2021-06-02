// src/components/App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HeaderDrawer, Error, Login, PrivateRoute, PublicRoute } from "./views";
import StructuresTable from "./components/StructuresTable";

function App() {
  return (
    <Router>
      <HeaderDrawer />
      <Switch>
        <PrivateRoute path="/" exact={true}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;

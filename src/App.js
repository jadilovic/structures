// src/components/App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Home, PrivateRoute, Error, Header } from "./views";
import StructuresTable from "./components/StructuresTable";
import MachinesTable from "./components/MachinesTable";
import FormStructure from "./components/FormStructure";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <PrivateRoute path="/" exact={true}>
          <StructuresTable />
        </PrivateRoute>
        <PrivateRoute path="/form-structure" exact={true}>
          <FormStructure />
        </PrivateRoute>
        <PrivateRoute path="/machines-table" exact={true}>
          <MachinesTable />
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

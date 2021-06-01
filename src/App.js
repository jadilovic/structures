// src/components/App.js

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, PrivateRoute, Error, HeaderDrawer } from "./views";
import StructuresTable from "./components/StructuresTable";
import MachinesTable from "./components/MachinesTable";
import FormStructure from "./components/FormStructure";
import IndividualStructure from "./components/IndividualStructure";
import IndividualMachine from "./components/IndividualMachine";

function App() {
  return (
    <Router>
      <HeaderDrawer />
    </Router>
  );
}

export default App;

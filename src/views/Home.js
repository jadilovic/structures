// src/pages/Home.js

import React, { Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Switch,
  Route,
  Link,
  BrowserRouter,
  useHistory,
} from "react-router-dom";
import StructuresTable from "../components/StructuresTable";
import MachinesTable from "../components/MachinesTable";
//import TableSensors from "../components/TableSensors";
import FormStructure from "../components/FormStructure";
//import FormMachine from "../temp-folder/FormMachine";
//import FormSensor from "../components/FormSensor";
import { AppBar } from "@material-ui/core";
import "./styles.css";
import IndividualStructure from "../components/IndividualStructures";

function Home() {
  const routes = [
    "/",
    "/form-structure",
    "/machines-table",
    "/individual-structure",
    // "/mach-form",
    // "/sens-tbl",
    // "/frm-sensor",
    //  "/login",
  ];
  const history = useHistory();

  function logout() {
    localStorage.removeItem("user");
    history.push("/login");
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <AppBar>
                <Tabs value={location.pathname} variant="fullWidth">
                  <Tab
                    value={routes[0]}
                    label="Structures"
                    component={Link}
                    to="/"
                  />
                  <Tab
                    value={routes[1]}
                    label="Structure Form"
                    component={Link}
                    to="/form-structure"
                  />
                  <Tab
                    value={routes[2]}
                    label="Machines"
                    component={Link}
                    to="/machines-table"
                  />
                  <Tab
                    value={routes[3]}
                    // label="Single Structure"
                    // component={Link}
                    // to="/individual-structure"
                  />
                  {/*
                  <Tab
                    value={routes[2]}
                    label="Machines Table"
                    component={Link}
                    to="/tbl-mach"
                  />
                  <Tab
                    value={routes[3]}
                    label="Machine Form"
                    component={Link}
                    to="/mach-form"
                  />
                  <Tab
                    value={routes[4]}
                    label="Sensors Table"
                    component={Link}
                    to="/sens-tbl"
                  />
                  <Tab
                    value={routes[5]}
                    label="Sensor Form"
                    component={Link}
                    to="/frm-sensor"
                  />
                    */}
                  <Tab
                    value={routes[4]}
                    label="LOGOUT"
                    component={Link}
                    to="/login"
                    onClick={logout}
                  />
                </Tabs>
              </AppBar>
              <Switch>
                <Route
                  path="/individual-structure"
                  component={IndividualStructure}
                />
                <Route path="/machines-table" component={MachinesTable} />
                <Route path="/form-structure" component={FormStructure} />
                <Route path="/" component={StructuresTable} />
                {/*
                <Route path="/frm-sensor" component={FormSensor} />
                <Route path="/sens-tbl" component={TableSensors} />
                <Route path="/mach-form" component={FormMachine} />
                <Route path="/tbl-mach" component={TableMachines} />
                  */}
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default Home;

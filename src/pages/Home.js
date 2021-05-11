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
import TableStructures from "../components/TableStructures";
import TableMachines from "../components/TableMachines";
import TableSensors from "../components/TableSensors";
import FormStructure from "../components/FormStructure";
import FormMachine from "../components/FormMachine";
import FormSensor from "../components/FormSensor";
import { AppBar } from "@material-ui/core";

import "./styles.css";

function Home() {
  const routes = [
    "/",
    "/form-str",
    "/tbl-mach",
    "/mach-form",
    "/sens-tbl",
    "/frm-sensor",
    "/login",
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
                <Tabs value={location.pathname}>
                  <Tab
                    value={routes[0]}
                    label="Structures Table"
                    component={Link}
                    to="/"
                  />
                  <Tab
                    value={routes[1]}
                    label="Structure Form"
                    component={Link}
                    to="/form-str"
                  />
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
                  <Tab
                    value={routes[6]}
                    label="LOGOUT"
                    component={Link}
                    to="/login"
                    onClick={logout}
                  />
                </Tabs>
              </AppBar>
              <Switch>
                <Route path="/frm-sensor" component={FormSensor} />
                <Route path="/sens-tbl" component={TableSensors} />
                <Route path="/mach-form" component={FormMachine} />
                <Route path="/tbl-mach" component={TableMachines} />
                <Route path="/form-str" component={FormStructure} />
                <Route path="/" component={TableStructures} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default Home;

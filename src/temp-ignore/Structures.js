import React from "react";
import "./styles.css";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import Books from "../components/TableStructures";
import Favorites from "../components/FormStructure";
import { Dashboard, PrivateRoute } from "../pages";

export default function App() {
  const routes = ["/books", "/favorites", "/"];
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          render={(history) => (
            <AppBar>
              <Tabs
                value={
                  history.location.pathname !== "/"
                    ? history.location.pathname
                    : false
                }
              >
                {console.log(history.location.pathname)}
                <Tab
                  value={routes[0]}
                  label="books"
                  component={Link}
                  to={routes[0]}
                />
                <Tab
                  value={routes[1]}
                  label="Favorites"
                  component={Link}
                  to={routes[1]}
                />
                <Tab
                  value={routes[2]}
                  label="Home"
                  component={Link}
                  to={routes[2]}
                />
              </Tabs>
            </AppBar>
          )}
        />

        <Switch>
          <Route path="/books" component={Books} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/favorites" component={Books} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

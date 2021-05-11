import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  function logout() {
    localStorage.removeItem("user");
    setLoggedIn(false);
  }

  return (
    <AppBar position="static" style={{ display: "flex" }}>
      <Toolbar>
        <Typography variant="h6">Tika Technologies</Typography>
        <div style={{ marginLeft: "auto" }}>
          {loggedIn ? (
            <>
              <Link to="/login">
                <Button color="default" onClick={logout}>
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <Button color="default">Login</Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

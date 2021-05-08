import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { login, logout } from "../actions/auth";

const NavBar = () => {
  const [isAuthUser, setIsAuthUser] = useState(false);
  useEffect(() => {
    console.log("TEST");
    if (isAuthUser) {
      setIsAuthUser(false);
    } else {
      setIsAuthUser(true);
    }
  }, []);

  return (
    <AppBar position="static" style={{ display: "flex" }}>
      <Toolbar>
        <Typography variant="h6">Tika Technologies</Typography>
        <div style={{ marginLeft: "auto" }}>
          {isAuthUser ? (
            <>
              <Link to="/home">
                <Button color="default">Home</Button>
              </Link>
              <Link to="/my-account">
                <Button color="default">My Account</Button>
              </Link>
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

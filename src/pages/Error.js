// src/pages/Error.js

import React from "react";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";

const Error = () => {
  return (
    <div>
      <Alert p={3} variant="filled" severity="error">
        This is an error alert!
      </Alert>
      <Alert variant="filled" severity="warning">
        <h1>404</h1>
        <h3>sorry, the page you tried cannot be found</h3>
      </Alert>
      <Alert variant="filled" severity="success">
        <Link to="/" className="btn">
          <Button variant="contained" color="primary" disableElevation>
            back home or login page
          </Button>
        </Link>
      </Alert>
    </div>
  );
};

export default Error;

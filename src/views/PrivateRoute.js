import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const isUser = user && user.token;
  return (
    <Route
      {...rest}
      render={() => (isUser ? children : <Redirect to="/login" />)}
    />
  );
};
export default PrivateRoute;

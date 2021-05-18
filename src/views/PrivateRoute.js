import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const isUser = user && user.token;
  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;

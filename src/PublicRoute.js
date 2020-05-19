import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function PublicRoute({ component: Component, restricted, ...rest }) {

  return <Route
    {...rest}
    render={props =>
      (localStorage.getItem("jwt") && restricted) ?
        <Redirect
          to="/admin"
        />
        :
        <Component {...props} />
    }
  />
}



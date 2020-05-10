import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function RouteWrapper({
  component: Component,
  ...rest
}) {
  if (!localStorage.getItem("jwt")) {
    return <Redirect to="/login" />;
  }
  else{
    return <Route {...rest} component={Component} />;
  }
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

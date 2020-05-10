
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
// core components
import Admin from "layouts/Admin.js";
import Login from "layouts/Login.js";
import Dashboard from "./views/Dashboard/Dashboard.js"
import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/login" />
      <PrivateRoute path="/admin" component={Admin} />
    </Switch>
  </Router>,
  document.getElementById("root")
);


import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// core components
import Admin from "layouts/Admin.js";
import Login from "layouts/Login.js";
import Dashboard from "./views/Dashboard/Dashboard.js"
import "assets/css/material-dashboard-react.css?v=1.8.0";
import routes from "./routes.js";
const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      
      <PublicRoute restricted={true} path="/login" component={Login} exact/>
      <PrivateRoute path="/admin" component={Admin} exact/>
      <PrivateRoute path="/admin/dashboard" component={Admin} exact/>
      <PrivateRoute path="/admin/users" component={Admin} exact/>
      <PrivateRoute path="/admin/bikes" component={Admin} exact/>
      <PrivateRoute path="/admin/payments" component={Admin} exact/>
      <PrivateRoute path="/admin/reports" component={Admin} exact/>
      <PrivateRoute path="/admin/transactions" component={Admin} exact/>
      <PrivateRoute path="/admin/usages" component={Admin} exact/>
      <PrivateRoute path="/admin/zones" component={Admin} exact/>
      <PrivateRoute path="/admin/map" component={Admin} exact/>
      <PrivateRoute path="/admin/profile" component={Admin} exact/>
    
    </Switch>
  </Router>,
  document.getElementById("root")
);

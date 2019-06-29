import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import Gas from "./components/Gas";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const Router = ({ setUser, user }) => (
  <Switch>
    <Route
      exact
      path="/map"
      render={props => <Main user={user} {...props} />}
    />
    <Route
      exact
      path="/map/auth/login"
      render={props => <Login {...props} setUser={setUser} user={user} />}
    />
    <Route
      exact
      path="/map/auth/register"
      render={props => <Signup {...props} setUser={setUser} user={user} />}
    />
    <Route
      exact
      path="/map/gas/:id"
      render={props => <Gas {...props} setUser={setUser} user={user} />}
    />
  </Switch>
);

export default Router;

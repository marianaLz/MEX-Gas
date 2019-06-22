import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import Container from "./components/auth/Container";
import Gas from "./components/Gas";

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
      render={props => <Container {...props} setUser={setUser} user={user} />}
    />
    <Route
      exact
      path="/map/auth/register"
      render={props => <Container {...props} setUser={setUser} user={user} />}
    />
    <Route
      exact
      path="/map/gas/:id"
      render={props => <Gas {...props} setUser={setUser} user={user} />}
    />
  </Switch>
);

export default Router;

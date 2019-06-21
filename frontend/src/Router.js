import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import Container from "./components/auth/Container";
import Gas from "./components/Gas";

const Router = ({ setUser, user }) => (
  <Switch>
    <Route
      exact
      path="/api"
      render={props => <Main user={user} {...props} />}
    />
    <Route
      exact
      path="/api/auth/login"
      render={props => <Container {...props} setUser={setUser} user={user} />}
    />
    <Route
      exact
      path="/api/auth/register"
      render={props => <Container {...props} setUser={setUser} user={user} />}
    />
    <Route
      exact
      path="/api/gas/:id"
      render={props => <Gas {...props} setUser={setUser} user={user} />}
    />
  </Switch>
);

export default Router;

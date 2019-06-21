import React, { Component } from "react";
import Router from "./Router";
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Router />
      </div>
    );
  }
}

export default App;

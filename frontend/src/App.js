import React, { Component } from "react";
import Router from "./Router";
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  state = {
    user: null
  };

  setUser = user => {
    this.setState({ user });
  };
  render() {
    let { user } = this.state;
    let { setUser } = this;
    return (
      <div>
        <Nav user={user} setUser={setUser} />
        <Router setUser={setUser} />
      </div>
    );
  }
}

export default App;

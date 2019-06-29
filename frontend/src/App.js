import React, { Component } from "react";
import Router from "./Router";
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  state = {
    user: null
  };

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("USER"));
    this.setState({ user });
  }

  setUser = user => {
    this.setState({ user });
  };
  render() {
    let { user } = this.state;
    let { setUser } = this;
    return (
      <div>
        <Nav user={user} setUser={setUser} />
        <Router user={user} setUser={setUser} />
      </div>
    );
  }
}

export default App;

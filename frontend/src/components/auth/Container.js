import React, { Component } from "react";
import Form from "./Form";
import { login, register } from "../../services/auth";
import video from "../../assets/video.gif";
import "../../stylesheets/Auth.css";

class Container extends Component {
  state = {
    auth: {
      email: "",
      password: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { auth } = this.state;
    const { pathname } = this.props.location;
    if (!auth.email.length) {
      return this.setState({ error: "Ingresa tus datos" });
    }
    pathname === "/login" ? this.onLogin() : this.onRegister();
  };

  onLogin = () => {
    const { auth } = this.state;
    login(auth)
      .then(({ token, user }) => {
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("USER", JSON.stringify(user));
        this.props.setUser(user);
        this.props.history.push("/");
      })
      .catch(error => {
        return this.setState({ error: error.message });
      });
  };

  onRegister = () => {
    const { auth } = this.state;
    register(auth)
      .then(({ token, user }) => {
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("USER", JSON.stringify(user));
        this.props.setUser(user);
        this.props.history.push("/otra");
      })
      .catch(error => {
        return this.setState({ error: error.message });
      });
  };

  handleChange = e => {
    const { auth } = this.state;
    let field = e.target.name;
    auth[field] = e.target.value;
    this.setState({ auth });
  };

  render() {
    const { error, auth } = this.state;
    return (
      <div>
        <img className="background-video" src={video} alt="gif" />

        <div className="uk-position-center auth">
          <Form
            {...auth}
            error={error}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Container;

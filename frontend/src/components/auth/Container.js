import React, { Component } from "react";
import Form from "./Form";
import { loginUser, register } from "../../services/auth";
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
    console.log(this.props);

    if (!auth.email.length) {
      return this.setState({ error: "Ingresa tus datos" });
    }
    this.onLogin();
    //this.onRegister();
    //pathname === "map/auth/login" ? this.onLogin() : this.onRegister();
  };

  onLogin = () => {
    const { auth } = this.state;
    loginUser(auth)
      .then(({ token, user }) => {
        console.log(user);
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
    const { auth } = this.state; //saca del state el auth
    register(auth) // le manda el auth a la funcion register
      .then(({ token, user }) => {
        console.log(user);

        localStorage.setItem("TOKEN", token);
        localStorage.setItem("USER", JSON.stringify(user));
        this.props.setUser(user);
        this.props.history.push("/map");
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
        {/* <img className="background-video" src={video} alt="gif" /> */}

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

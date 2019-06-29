import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../services/auth";
import video from "../../assets/video.gif";
import "../../stylesheets/Auth.css";
import Swal from "sweetalert2";

class Login extends Component {
  state = {
    auth: {
      email: "",
      password: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { auth } = this.state;
    loginUser(auth)
      .then(({ user }) => {
        localStorage.setItem("USER", JSON.stringify(user));
        Swal.fire({
          position: "center",
          type: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500
        });
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

  onRedirect = () => {
    const isLog = localStorage.getItem("USER");

    return !isLog ? (
      <div>
        <img className="background-video" src={video} alt="gif" />

        <div className="uk-position-center auth">
          <div>
            <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
              <div className="uk-margin">
                <label
                  className="uk-form-label text uk-text-bold"
                  htmlFor="email"
                >
                  Correo electrónico:
                </label>
                <div className="uk-inline">
                  <span className="uk-form-icon" uk-icon="icon: mail" />
                  <input
                    onChange={this.handleChange}
                    className="uk-input input-auth"
                    type="email"
                    name="email"
                    placeholder="johnsnow@mail.com"
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label
                  className="uk-form-label text uk-text-bold"
                  htmlFor="password"
                >
                  Contraseña:
                </label>
                <div className="uk-inline">
                  <span className="uk-form-icon" uk-icon="icon: lock" />
                  <input
                    onChange={this.handleChange}
                    className="uk-input input-auth"
                    type="password"
                    name="password"
                    placeholder="********"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="uk-button btn text uk-text-bold uk-margin"
              >
                iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/map" />
    );
  };

  render() {
    return <div>{this.onRedirect()}</div>;
  }
}

export default Login;

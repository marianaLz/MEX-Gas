import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { register } from "../../services/auth";
import video from "../../assets/video.gif";
import "../../stylesheets/Auth.css";
import Swal from "sweetalert2";

class Login extends Component {
  state = {
    auth: {
      name: "",
      lastname: "",
      email: "",
      password: ""
    },
    error: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { auth } = this.state;
    register(auth)
      .then(({ user }) => {
        localStorage.setItem("USER", JSON.stringify(user));
        Swal.fire({
          position: "center",
          type: "success",
          title: "Signed in successfully",
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
                <label className="uk-form-label text uk-text-bold">
                  Nombre:
                </label>
                <div className="uk-inline">
                  <span className="uk-form-icon" uk-icon="icon: user" />
                  <input
                    onChange={this.handleChange}
                    className="uk-input input-auth"
                    name="name"
                    placeholder="Nombre"
                    required="true"
                  />
                </div>
              </div>
              <div className="uk-margin">
                <label className="uk-form-label text uk-text-bold">
                  Apellido:
                </label>
                <div className="uk-inline">
                  <span className="uk-form-icon" uk-icon="icon: users" />
                  <input
                    onChange={this.handleChange}
                    className="uk-input input-auth"
                    name="lastname"
                    placeholder="Apellido"
                    required="true"
                  />
                </div>
              </div>
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
                    required="true"
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
                <small className="uk-flex uk-flex-middle uk-flex-center uk-margin-small-top">
                  Tu contraseña debe contener mínimo 8 caracteres, <br />
                  un número y una letra mayúscula.
                </small>
                <div className="uk-inline uk-margin-top">
                  <span className="uk-form-icon" uk-icon="icon: lock" />
                  <input
                    onChange={this.handleChange}
                    className="uk-input input-auth"
                    type="password"
                    name="password"
                    placeholder="********"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required="true"
                  />
                </div>
              </div>
              <div className="uk-margin">
                <label
                  className="uk-form-label text uk-text-bold"
                  htmlFor="password"
                >
                  Confirmar contraseña:
                </label>
                <div className="uk-inline">
                  <span className="uk-form-icon" uk-icon="icon: lock" />
                  <input
                    onChange={this.handleChange}
                    className="uk-input input-auth"
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    required="true"
                  />
                </div>
              </div>

              {this.error && <p className="uk-text-danger">{this.error}</p>}

              <button
                type="submit"
                className="uk-button btn text uk-text-bold uk-margin"
              >
                Registrarse
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

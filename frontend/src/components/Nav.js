import React, { Component } from "react";
import "../stylesheets/Nav.css";
import logoComplete from "../assets/logo-complete.png";
import logo from "../assets/logo.png";
import letras from "../assets/letras.png";
import { Link } from "react-router-dom";

class Nav extends Component {
  logout = () => {
    localStorage.clear();
    let user = null;
    this.props.setUser(user);
  };

  render() {
    let { user } = this.props;
    return (
      <div className="uk-navbar uk-navbar-container uk-margin-remove">
        <div className="uk-flex uk-flex-middle uk-width-1-1">
          {user ? (
            ""
          ) : (
            <button
              className="uk-button uk-button-small uk-margin-left hamburger uk-padding-remove"
              type="button"
              uk-toggle="target: #menu"
            >
              <span
                uk-icon="icon: menu; ratio: 2"
                uk-toggle="target: #canvas"
                id="menu"
              />
            </button>
          )}

          <Link to="/map" className="uk-width-medium main">
            <img className="logo" src={logo} alt="logo" />
            <img className="letras" src={letras} alt="letras" />
          </Link>
          {user ? (
            <Link
              to="/map/auth/login"
              className="uk-flex uk-flex-middle uk-position-right uk-button uk-margin-right uk-padding-remove logout"
              onClick={this.logout}
            >
              {" "}
              <h6 className="disp parr uk-margin-top">CERRAR SESIÓN</h6>
              <span uk-icon="icon: sign-out; ratio: 2" />
            </Link>
          ) : (
            ""
          )}
          {user ? (
            <Link className="uk-flex uk-flex-middle uk-position-right uk-button uk-margin-xlarge-right uk-padding-remove logout">
              {" "}
              <h6 className="disp parr uk-margin-top">VE A LA MEJOR</h6>
              <span
                className="uk-text-success"
                uk-icon="icon: location; ratio: 2"
              />
            </Link>
          ) : (
            ""
          )}
        </div>
        <div
          id="canvas"
          uk-offcanvas="mode: push; overlay: true uk-flex uk-flex-row"
        >
          <div className="uk-offcanvas-bar">
            <button
              className="uk-offcanvas-close"
              type="button"
              uk-close="true"
              uk-toggle="target: #menu"
            />
            <img
              src={logoComplete}
              alt="logo"
              width="180"
              className="uk-margin-large-top"
            />
            <h5 className="uk-container uk-margin-large">
              Accede para poder ver los comentarios de otros usuarios, añadir
              gasolineras y compartir tu experiencia con los demás.
            </h5>

            <div className="uk-container uk-margin">
              <Link
                to="/map/auth/login"
                className="uk-button btn uk-text-bold uk-margin-top-large text"
              >
                Iniciar sesión
              </Link>
              <hr className="uk-divider-icon" />
              <Link to="/map/auth/register" className="uk-text-bold text">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;

import React from "react";
import "../stylesheets/Nav.css";
import logoComplete from "../assets/logo-complete.png";
import logo from "../assets/logo.png";
import letras from "../assets/letras.png";
import { Link } from "react-router-dom";

const Nav = () => (
  <div className="uk-navbar uk-navbar-container uk-margin-remove">
    <div className="uk-flex uk-flex-middle uk-width-2-3 uk-flex-between">
      <button
        className="uk-button uk-button-small uk-margin-left hamburger"
        type="button"
        uk-toggle="target: #menu"
      >
        <span
          uk-icon="icon: menu; ratio: 2"
          uk-toggle="target: #canvas"
          id="menu"
        />
      </button>
      <a
        className="uk-width-large uk-flex uk-flex-center uk-flex-middle mar"
        href="/map"
      >
        <img className="logo" src={logo} alt="logo" />
        <img className="letras" src={letras} alt="letras" />
      </a>
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
        <img src={logoComplete} alt="logo" />
        <h4 className="uk-container uk-margin-large">
          Accede para poder ver los comentarios de otros usuarios y compartir tu
          experiencia con los demás.
        </h4>

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

export default Nav;

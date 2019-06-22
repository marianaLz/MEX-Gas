import React from "react";
import "../stylesheets/Nav.css";
import logoComplete from "../assets/logo-complete.png";
import logo from "../assets/logo.png";
import letras from "../assets/letras.png";
const Nav = () => (
  <div className="uk-navbar uk-navbar-container uk-margin-remove">
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
    <div
      className="uk-container-center uk-flex uk-flex-center"
      style={{ width: "100%" }}
    >
      <img className="logo" src={logo} />
      <img className="letras" src={letras} />
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
        <img src={logoComplete} />
        <p className="uk-container uk-margin-large">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <div className="uk-container uk-margin">
          <a
            className="uk-button btn uk-text-bold uk-margin-top-large text"
            href="/api/auth/login"
          >
            Iniciar sesión
          </a>
          <hr className="uk-divider-icon" />
          <a className="uk-text-bold text" href="/api/auth/register">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Nav;

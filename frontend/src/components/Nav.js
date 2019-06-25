import React from "react";
import "../stylesheets/Nav.css";
import logoComplete from "../assets/logo-complete.png";
import logo from "../assets/logo.png";
import letras from "../assets/letras.png";
const Nav = () => (
  <div className="uk-navbar uk-navbar-container uk-margin-remove">
    <div className="uk-flex uk-flex-middle uk-flex-between uk-width-1-1">
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
        className="uk-width-large uk-flex uk-flex-center uk-flex-middle"
        href="/map"
      >
        <img className="logo" src={logo} alt="logo" />
        <img className="letras" src={letras} alt="letras" />
      </a>
      <div className="uk-flex uk-margin-left">
        <button
          className="uk-margin-small-right"
          type="button"
          uk-icon="icon: plus-circle"
          ratio="2"
        />
        <h5 className="uk-margin uk-margin-medium-right disp">
          Crear nueva <br /> gasolinera
        </h5>
      </div>
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
          <a
            className="uk-button btn uk-text-bold uk-margin-top-large text"
            href="/map/auth/login"
          >
            Iniciar sesión
          </a>
          <hr className="uk-divider-icon" />
          <a className="uk-text-bold text" href="/map/auth/register">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Nav;

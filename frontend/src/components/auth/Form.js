import React from "react";
import "../../stylesheets/Nav.css";

const Form = ({ handleSubmit, handleChange, error, email, password }) => (
  <div>
    <form className="uk-form-stacked" onSubmit={handleSubmit}>
      <div className="uk-margin">
        <label className="uk-form-label text uk-text-bold" htmlFor="email">
          Correo electrónico:
        </label>
        <div className="uk-inline">
          <span className="uk-form-icon" uk-icon="icon: mail" />
          <input
            value={email}
            onChange={handleChange}
            className="uk-input input-auth"
            type="email"
            name="email"
            placeholder="johnsnow@mail.com"
          />
        </div>
      </div>

      <div className="uk-margin">
        <label className="uk-form-label text uk-text-bold" htmlFor="password">
          Contraseña:
        </label>
        <div className="uk-inline">
          <span className="uk-form-icon" uk-icon="icon: lock" />
          <input
            value={password}
            onChange={handleChange}
            className="uk-input input-auth"
            type="password"
            name="password"
            placeholder="********"
          />
        </div>
      </div>

      {error && (
        <div className="uk-alert-danger" uk-alert="true">
          <p>{error}</p>
        </div>
      )}

      <button className="uk-button btn text uk-text-bold uk-margin">
        iniciar sesión
      </button>
    </form>
  </div>
);

export default Form;

import React from "react";

const Form = ({ handleSubmit, handleChange, error, email, password }) => (
  <div>
    <form className="uk-form-stacked" onSubmit={handleSubmit}>
      <div className="uk-margin">
        <label className="uk-form-label text uk-text-bold" htmlFor="email">
          Email:
        </label>
        <div className="uk-inline">
          <span className="uk-form-icon" uk-icon="icon: user" />
          <input
            value={email}
            onChange={handleChange}
            className="uk-input"
            type="email"
            name="email"
          />
        </div>
      </div>

      <div className="uk-margin">
        <label className="uk-form-label text uk-text-bold" htmlFor="password">
          Password:
        </label>
        <div className="uk-inline">
          <span className="uk-form-icon" uk-icon="icon: lock" />
          <input
            value={password}
            onChange={handleChange}
            className="uk-input"
            type="password"
            name="password"
          />
        </div>
      </div>

      {error && (
        <div className="uk-alert-danger" uk-alert="true">
          <p>{error}</p>
        </div>
      )}

      <div>
        <button className="uk-button btn text uk-text-bold">Login</button>
      </div>
    </form>
  </div>
);

export default Form;

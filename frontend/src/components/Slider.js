import React, { Component } from "react";
import "../stylesheets/Slider.css";

class Slider extends Component {
  render() {
    return (
      <div
        className="uk-position-relative uk-visible-toggle uk-light slider"
        tabIndex="-1"
        uk-slider="true"
      >
        <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m">
          <li>
            <img
              className="img-slider"
              src="http://cdn.shopify.com/s/files/1/0191/7850/products/RICKMORTY_39_-_COVER_A_FNL_WEB_1024x1024.jpg?v=1530034748"
              alt=""
            />
            <div className="uk-overlay uk-overlay-primary uk-position-bottom uk-padding-small">
              <p>
                Default Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </li>
          <li>
            <img
              className="img-slider"
              src="http://cdn.shopify.com/s/files/1/0191/7850/products/RICKMORTY_39_-_COVER_A_FNL_WEB_1024x1024.jpg?v=1530034748"
              alt=""
            />
          </li>
          <li>
            <img
              className="img-slider"
              src="http://cdn.shopify.com/s/files/1/0191/7850/products/RICKMORTY_39_-_COVER_A_FNL_WEB_1024x1024.jpg?v=1530034748"
              alt=""
            />
          </li>
          <li>
            <img
              className="img-slider"
              src="http://cdn.shopify.com/s/files/1/0191/7850/products/RICKMORTY_39_-_COVER_A_FNL_WEB_1024x1024.jpg?v=1530034748"
              alt=""
            />
          </li>
          <li>
            <img
              className="img-slider"
              src="http://cdn.shopify.com/s/files/1/0191/7850/products/RICKMORTY_39_-_COVER_A_FNL_WEB_1024x1024.jpg?v=1530034748"
              alt=""
            />
          </li>
        </ul>

        <a
          className="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-previous="true"
          uk-slider-item="previous"
        />
        <a
          className="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-next="true"
          uk-slider-item="next"
        />
      </div>
    );
  }
}

export default Slider;

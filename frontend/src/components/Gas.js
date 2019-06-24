import React from "react";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";
import "../stylesheets/Gas.css";
import { una_gas } from "../services/gas";
import Rate from "./Rate";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWx6eiIsImEiOiJjandrNmVzNzUwNWZjNGFqdGcwNmJ2ZWhpIn0.ybY6wnAtJwj-Tq0c46sW6A";

class Gas extends React.Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const user_location = [
          position.coords.longitude,
          position.coords.latitude
        ];
        map.setZoom(14).setCenter(user_location);
        new mapboxgl.Marker({ color: "red" })
          .setLngLat(user_location)
          .setPopup(new mapboxgl.Popup().setHTML("<h3>Usted está aquí</h3>"))
          .addTo(map);
      });
    }

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9"
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true
      })
    );
    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        language: "es",
        placeholderOrigin: "Seleccione su lugar de origen",
        placeholderDestination: "Seleccione su destino"
      }),
      "top-left"
    );
    map.addControl(new mapboxgl.NavigationControl());

    let id = this.props.match.params.id;
    una_gas(id).then(gas => {
      console.log("<<<<<<<<<<<", gas);

      const lat = gas.location.coordinates[1];
      const lng = gas.location.coordinates[0];
      if (gas.dieasel == null) {
        gas.dieasel = "No disponible";
      }
      const popup = new mapboxgl.Popup().setHTML(
        "<p>Estrellitas</p><h4>" +
          gas.razonsocial +
          "</h4>" +
          "<strong>Premium: $" +
          gas.premium +
          "</strong><br><strong>Magna: $" +
          gas.regular +
          "</strong><br><strong>Diesel: " +
          gas.dieasel +
          "</strong><p>" +
          gas.location.calle +
          "</p><a href='/api/gas/" +
          gas._id +
          "'>Comentarios</a>"
      );
      return new mapboxgl.Marker({ color: "green" })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
    });
  }

  render() {
    return (
      <div className="uk-flex uk-flex-row">
        <div>
          <div
            style={{ width: "60vw", height: "60vh" }}
            ref={e => (this.mapContainer = e)}
          />
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
                    Default Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
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
        </div>
        <div className="uk-card uk-card-default height-small">
          <div className="uk-card-body uk-padding-small uk-flex uk-flex-center">
            <h4>Califica esta gasolinera:</h4>
            <Rate />
          </div>
        </div>
        <form>
          <div className="uk-card uk-card-default uk-height-small uk-position-bottom-right">
            <div className="uk-card-body uk-padding-small uk-padding-top uk-flex uk-flex-between uk-flex-middle">
              <textarea
                rows="3"
                className="uk-textarea"
                name="comment"
                placeholder="Escribe un comentario"
              />
              <div className="uk-form-custom">
                <button
                  type="button"
                  tabIndex="-1"
                  uk-icon="icon: camera; ratio: 1.5"
                />
                <input type="file" name="commentPic" />
              </div>
            </div>
            <div className="uk-card-footer uk-padding-remove">
              <button
                type="submit"
                className="uk-button uk-button-text uk-align-center uk-margin-small-top"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Gas;

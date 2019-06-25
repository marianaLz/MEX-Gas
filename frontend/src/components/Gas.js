import React, { Component } from "react";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";
import "../stylesheets/Gas.css";
import { una_gas, putComment } from "../services/gas";
import Rate from "./Rate";
import Slider from "./Slider";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWx6eiIsImEiOiJjandrNmVzNzUwNWZjNGFqdGcwNmJ2ZWhpIn0.ybY6wnAtJwj-Tq0c46sW6A";

class Gas extends Component {
  state = {
    data: {},
    gas: {}
  };

  handleChange = e => {
    let { data } = this.state;
    let { value, name } = e.target;
    data[name] = value;
    this.setState({ data });
  };

  //uploadImage = () =>{...}

  sendComments = e => {
    e.preventDefault();
    let id = this.props.match.params.id;
    let { data } = this.state;
    putComment(id, data)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  };

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
      this.setState({ gas });
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
    let { handleChange } = this;
    let { gas } = this.state;
    return (
      console.log(gas.comments),
      (
        <div className="uk-flex uk-flex-row">
          <div>
            <div
              style={{ width: "60vw", height: "60vh" }}
              ref={e => (this.mapContainer = e)}
            />
            <Slider />
          </div>
          <div>
            <div className="uk-card uk-card-default height-small">
              <div className="uk-card-body uk-padding-small uk-flex uk-flex-center">
                <h4>Califica esta gasolinera:</h4>
                <Rate />
              </div>
            </div>

            <div className="uk-panel uk-panel-scrollable">gas.comments</div>

            <form onSubmit={this.sendComments}>
              <div className="uk-card uk-card-default uk-height-small uk-position-bottom-right">
                <div className="uk-card-body uk-padding-small uk-padding-top uk-flex uk-flex-between uk-flex-middle">
                  <textarea
                    rows="3"
                    className="uk-textarea"
                    name="content"
                    placeholder="Escribe un comentario"
                    onChange={handleChange}
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
        </div>
      )
    );
  }
}

export default Gas;

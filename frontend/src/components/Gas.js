import React, { Component } from "react";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";
import "../stylesheets/Gas.css";
import { una_gas, putComment } from "../services/gas";
import Rate from "./Rate";
import moment from "moment";
import user from "../assets/user.png";

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
  };

  //uploadImage = () =>{...}

  sendComments = e => {
    let id = this.props.match.params.id;
    let { data } = this.state;
    console.log(data);
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
          "</p>"
      );
      return new mapboxgl.Marker({ color: "green" })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
    });
  }

  handleRate = rate => {
    let { data } = this.state;
    data["rating"] = rate;
    this.setState(data);
  };

  render() {
    let { handleChange } = this;
    let { gas } = this.state;
    return (
      <div className="uk-flex uk-flex-row">
        <div className="uk-margin-small-top uk-margin-small-left">
          <div
            style={{ width: "60vw", height: "87vh" }}
            ref={e => (this.mapContainer = e)}
          />
        </div>
        <div className="uk-margin-small uk-margin-small-left">
          <form className="uk-panel" onSubmit={this.sendComments}>
            <div className="uk-card-body uk-padding-small">
              <div className="uk-flex uk-flex-center">
                <h4>Califica esta gasolinera:</h4>
                <Rate handleRate={this.handleRate} />
              </div>
              <textarea
                rows="3"
                className="uk-textarea uk-width-large"
                name="content"
                placeholder="Escribe un comentario"
                onChange={handleChange}
              />

              <button
                type="submit"
                className="uk-button uk-button-text uk-align-center uk-margin-small-top"
              >
                enviar comentario y calificación
              </button>
            </div>
          </form>
          <div />
          <div className="uk-panel uk-panel-scrollable uk-margin-small">
            <h4 className="uk-text-center">Comentarios de otros usuarios:</h4>
            {gas["comments"] !== undefined ? (
              gas["comments"].reverse().map((data, i) => (
                <div>
                  <div className="uk-flex uk-flex-around">
                    <img
                      className="uk-border-circle usr"
                      src={user}
                      alt="user-img"
                    />
                    <div>
                      <div
                        className="uk-width-large uk-text-break uk-margin-right"
                        key={i}
                      >
                        {data.content}
                        <p
                          href="#"
                          className="uk-text-small uk-text-muted uk-margin-remove"
                        >
                          Calificación: {data.rating} <br />
                          Publicado {moment(data.expiration_date).fromNow()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div>Agrega un comentario</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Gas;

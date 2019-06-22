import React, { Component } from "react";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";
import "./App.css";
import { gas } from "../src/services/gas";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWx6eiIsImEiOiJjandrNmVzNzUwNWZjNGFqdGcwNmJ2ZWhpIn0.ybY6wnAtJwj-Tq0c46sW6A";

class Main extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const user_location = [
          position.coords.longitude,
          position.coords.latitude
        ];
        map.setZoom(15).setCenter(user_location);
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

    gas().then(({ gass }) => {
      gass.forEach(e => {
        const lat = e.location.coordinates[1];
        const lng = e.location.coordinates[0];
        const name = e.razonsocial.toUpperCase();
        if (e.dieasel == null) {
          e.dieasel = "No disponible";
        }
        const popup = new mapboxgl.Popup().setHTML(
          "<p>Estrellitas</p><h5>" +
            name +
            "</h5>" +
            "<strong>Premium: $" +
            e.premium +
            "</strong><br><strong>Magna: $" +
            e.regular +
            "</strong><br><strong>Diesel: " +
            e.dieasel +
            "</strong><p>" +
            e.location.calle +
            "</p><a href='/map/gas/" +
            e._id +
            "'>Comentarios</a>"
        );
        return new mapboxgl.Marker({ color: "green" })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);
      });
    });
  }

  render() {
    return (
      <div
        style={{ width: "100vw", height: "90vh" }}
        ref={e => (this.mapContainer = e)}
      />
    );
  }
}

export default Main;

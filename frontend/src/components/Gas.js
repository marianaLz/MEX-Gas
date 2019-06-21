import React from "react";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";
import "../App.css";
import { una_gas } from "../services/gas";

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
      <div
        style={{ width: "50vw", height: "90vh" }}
        ref={e => (this.mapContainer = e)}
      />
    );
  }
}

export default Gas;

import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.headers = {
  "Content-Type": "application/json"
};

const isProduction = process.env.NODE_ENV === "production";
const base_url = isProduction
  ? "https://mex-gas.herokuapp.com/api"
  : "http://localhost:3000/api";

export const loginUser = auth => {
  return (
    axios
      .post(`${base_url}/auth/login`, auth)
      .then(res => res.data)
      // .then(res =>
      //   Swal({
      //     type: "succes",
      //     title: "Bienvenido",
      //     text: res.data.email
      //   })
      //)
      .catch(error => {
        throw error.response.data;
      })
  );
};

export const register = auth => {
  return axios
    .post(`${base_url}/auth/register`, auth)
    .then(res => res.data)
    .catch(error => {
      throw error.response.data;
    });
};

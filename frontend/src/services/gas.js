import axios from "axios";

axios.defaults.headers = {
  "Content-Type": "application/json"
};

const isProduction = process.env.NODE_ENV === "production";
const base_url = isProduction
  ? "https://mex-gas.herokuapp.com/api"
  : "http://localhost:3000/api";

export const gas = gas => {
  return axios
    .get(`${base_url}/gas/`, gas)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const una_gas = id => {
  return axios
    .get(`${base_url}/gas/${id}`)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const putComment = (id, data) => {
  return axios
    .post(`${base_url}/gas/${id}/review`, data)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

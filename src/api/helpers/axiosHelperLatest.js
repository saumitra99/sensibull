/* eslint no-param-reassign: "error" */
import axios from "axios";

// let authToken = null;
const apiURLOriginal = process.env.REACT_APP_API_URL;

export { apiURLOriginal };

const apiURL = `${apiURLOriginal}`;

const request = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 90000,
});

export default request;

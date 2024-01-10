import axios from "axios";

const baseUrl = "http://localhost:4000/api";

export const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

import axios from "axios";

const httpClient = axios.create({
  baseURL:
    process.env.REACT_APP_ENV !== "DEV"
      ? process.env.REACT_APP_BACKEND_URL
      : "",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default httpClient;

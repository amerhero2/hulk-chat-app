import axios from "axios";
import appConfig from "../config/appConfig";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: appConfig.apiURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

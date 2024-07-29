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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await instance.post(
          "/refresh-token",
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;

        Cookies.remove("token");
        Cookies.set("token", accessToken, { expires: 1 / 24 });

        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

import axios from "axios";
import { checkAccessToken } from "../helpers/Auth.helper";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token != "undefined" && token != null) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const isValid = await checkAccessToken();
        if (isValid) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
          return instance(originalRequest);
        } else {
          return Promise.reject(error);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

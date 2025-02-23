import axios from "axios";

export const jsonAPI = axios.create({
  baseURL: `http://${import.meta.env.VITE_REST_API_HOST}:${import.meta.env.VITE_REST_API_PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

jsonAPI.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

jsonAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("access-token");
    }
    return Promise.reject(error);
  }
);

export const authAPI = axios.create({
  baseURL: `http://${import.meta.env.VITE_REST_API_HOST}:${import.meta.env.VITE_REST_API_PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";

export const jsonAPI = axios.create({
  baseURL: "",
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
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

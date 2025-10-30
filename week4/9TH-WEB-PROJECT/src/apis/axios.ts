import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        accessToken = JSON.parse(accessToken);
      } catch (e) {
        console.error("Failed to parse accessToken from localStorage", e);
      }
      
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
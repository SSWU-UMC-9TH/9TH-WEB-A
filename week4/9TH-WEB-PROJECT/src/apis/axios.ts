import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const BASE_URL = import.meta.env.VITE_SERVER_API_URL;

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
      try {
        config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
      } catch {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccess } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const { removeItem: removeRefresh } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccess();
        removeRefresh();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (!refreshPromise) {
        const { getItem: getRefresh } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        const refreshToken = getRefresh();

        if (!refreshToken) {
          window.location.href = "/login";
          return Promise.reject(error);
        }

        refreshPromise = axios
          .post(`${BASE_URL}/v1/auth/refresh`, { refresh: refreshToken })
          .then((res) => {
            const { setItem: setAccess } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { setItem: setRefresh } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

            const newAccess = res.data?.data?.accessToken;
            const newRefresh = res.data?.data?.refreshToken;

            if (newAccess && newRefresh) {
              setAccess(newAccess);
              setRefresh(newRefresh);
              return newAccess;
            } else {
              throw new Error("Invalid token response");
            }
          })
          .catch((err) => {
            const { removeItem: removeAccess } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { removeItem: removeRefresh } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccess();
            removeRefresh();
            window.location.href = "/login";
            return Promise.reject(err);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      
      const newAccessToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
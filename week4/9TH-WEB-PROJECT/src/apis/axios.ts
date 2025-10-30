import axios from "axios";

const BASE_URL = "http://localhost:8000";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      try {
        const parsed = JSON.parse(token);
        config.headers.Authorization = `Bearer ${parsed}`;
      } catch (e) {
        console.error("Failed to parse accessToken:", e);
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

    // 401 에러이면서 아직 재시도하지 않은 요청만 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // refresh 자체가 실패한 경우.. 로그아웃 처리
      if (originalRequest.url === "/v1/auth/refresh") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 이미 refresh 진행 중이면 그 Promise를 재사용
      if (!refreshPromise) {
        const refreshToken = JSON.parse(
          localStorage.getItem(REFRESH_TOKEN_KEY) || "null"
        );

        if (!refreshToken) {
          window.location.href = "/login";
          return Promise.reject(error);
        }

        refreshPromise = axiosInstance
          .post("/v1/auth/refresh", { refresh: refreshToken })
          .then((res) => {
            const newAccessToken = res.data?.data?.accessToken;
            const newRefreshToken = res.data?.data?.refreshToken;

            if (newAccessToken && newRefreshToken) {
              localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(newAccessToken));
              localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(newRefreshToken));
              return newAccessToken;
            } else {
              throw new Error("Invalid token response");
            }
          })
          .catch((err) => {
            console.error("Refresh token failed:", err);
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            window.location.href = "/login";
            return Promise.reject(err);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      // refresh 완료까지 기다렸다가 재시도
      const newAccessToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
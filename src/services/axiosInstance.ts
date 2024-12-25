"use client";

import axios from "axios";
import { getCookie } from "cookies-next/client";
import { ENV_VAR } from "../utils/envConstant";
import { clearCookies } from "./cookieService";

const axiosInstance = axios.create({
  baseURL: ENV_VAR.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for setting auth token
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`; // For Bearer token
    config.headers.token = token;
  }
  return config;
});

// Interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(
      "Error: ",
      error?.response?.data?.message || "An error occurred"
    );

    console.log(error);
    if (error?.response?.status === 401) {
      clearCookies();
      localStorage.clear();

      // Check the current page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

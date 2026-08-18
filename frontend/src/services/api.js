import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://backend-translation-app-french-arab.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour injecter automatiquement le jeton d'authentification Bearer
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("trad_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

import axios from "axios";

const apiBaseUrl = (): string => {
  if (typeof window._env_ === "object" && window._env_ !== null) {
    const apiBase = window._env_.REACT_APP_API_BASE;
    if (apiBase && typeof apiBase === "string") {
      return apiBase;
    }
    console.warn("REACT_APP_API_BASE não encontrada ou inválida.");
  }

  return "http://localhost:8000";
};

const api = axios.create({
  baseURL: apiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

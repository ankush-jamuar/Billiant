import api from "./api.js";

export const login = (payload) => {
  return api.post("/api/auth/login", payload);
};

export const register = (payload) => {
  return api.post("/api/auth/register", payload);
};

import api from "./api";

export const login = (credentials) => {
  return api.post("/api/auth/login", credentials);
};
export const register = (payload) => {
  api.post("/api/auth/register", payload);
};

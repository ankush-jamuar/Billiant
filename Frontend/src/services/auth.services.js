import api from "./api";

export const login = (credentials) => {
  return api.post("/api/auth/login", credentials);
};

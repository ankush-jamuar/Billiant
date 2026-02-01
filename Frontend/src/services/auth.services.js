import api from "./api.js";

export const login = (payload) => {
  return api.post("/api/auth/login", payload);
};

export const register = (payload) => {
  return api.post("/api/auth/register", payload);
};

export const verifyEmail = (token) => {
  return api.get(`/api/auth/verify-email?token=${token}`);
};

export const resendVerification = () => {
  return api.post("/api/auth/resend-verification");
};

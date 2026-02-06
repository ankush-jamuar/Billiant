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
  return api.post("/api/auth/resend-verification-email");
};

export const forgotPassword = (email) => {
  return api.post("/api/auth/forgot-password", { email });
};

export const resetPassword = ({ token, password }) => {
  return api.post("/api/auth/reset-password", { token, password });
};

export const getMe = () => {
  return api.get("/api/auth/me")
};

export const updateMe = (payload) => {
  return api.put("/api/auth/me", payload);
};

export const changePassword = (payload) => {
  return api.put("/api/auth/change-password", payload);
};

export const deleteAccount = () => {
  return api.delete("/api/users/me")
};
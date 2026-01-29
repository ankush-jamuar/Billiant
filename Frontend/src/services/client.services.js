import api from "./api";

export const getClients = () => {
  return api.get("/api/clients");
};

export const createClient = (data) => {
  return api.post("/api/clients", data);
};

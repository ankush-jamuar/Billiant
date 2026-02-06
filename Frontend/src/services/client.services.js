import api from "./api";

export const getClients = ({ q = "" } = {}) => {
  return api.get("/api/clients", {
    params: { q },
  });
};


export const createClient = (data) => {
  return api.post("/api/clients", data);
};

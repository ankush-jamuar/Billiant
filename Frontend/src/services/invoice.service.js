import api from "./api";

export const getInvoices = () => {
  return api.get("/api/invoices");
};

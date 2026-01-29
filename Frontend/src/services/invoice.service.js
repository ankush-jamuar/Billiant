import api from "./api";

export const getInvoices = () => {
  return api.get("/api/invoices");
};

export const createInvoice = (data) => {
  return api.post("/api/invoices", data);
};

export const getInvoiceById = (id) => {
  return api.get(`/api/invoices/${id}`);
};

export const updateInvoiceStatus = (id, status) => {
  return api.patch(`/api/invoices/${id}/status`, { status });
};

export const updateInvoice = (id, data) => {
  return api.put(`/api/invoices/${id}`, data);
};

export const deleteInvoice = (id) => {
  return api.delete(`/api/invoices/${id}`);
};
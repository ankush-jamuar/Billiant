import api from "./api";

export const getInvoices = ({ q = "", status = "all" } = {}) => {
  return api.get("/api/invoices", {
    params: { q, status },
  });
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

export const downloadInvoicePdf = async (invoiceId) => {
  const response = await api.get(`/api/invoices/${invoiceId}/pdf`, {
    responseType: "blob",
  });

  return response.data;
};

export const sendInvoice = (id) => {
  return api.post(`/api/invoices/${id}/send`);
};

export const resendInvoice = (id) => {
  api.post(`/api/invoices/${id}/resend`);
};

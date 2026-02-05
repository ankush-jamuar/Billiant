export const getInvoiceDisplayStatus = (invoice) => {
  if (invoice.status === "paid") return "paid";

  if (
    invoice.status === "sent" &&
    invoice.dueDate &&
    new Date(invoice.dueDate) < new Date()
  ) {
    return "overdue";
  }

  return invoice.status;
};

import fs from "fs";
import path from "path";

export const renderInvoicePdf = (invoice) => {
  const template = fs.readFileSync(
    path.resolve("templates/invoicePdf.template.html"),
    "utf-8"
  );

  const itemsHtml = invoice.items.map(
    (i) => `
      <tr>
        <td>${i.description}</td>
        <td>${i.quantity}</td>
        <td>₹${i.unitPrice}</td>
        <td>₹${i.total}</td>
      </tr>
    `
  ).join("");

  return template
    .replace("{{invoiceNumber}}", invoice.invoiceNumber)
    .replace("{{issueDate}}", new Date(invoice.issueDate).toLocaleDateString())
    .replace("{{dueDate}}", new Date(invoice.dueDate).toLocaleDateString())
    .replace("{{clientName}}", invoice.clientId.name)
    .replace("{{clientEmail}}", invoice.clientId.email)
    .replace("{{items}}", itemsHtml)
    .replace("{{subtotal}}", invoice.subtotal)
    .replace("{{tax}}", invoice.tax)
    .replace("{{taxAmount}}", invoice.taxAmount)
    .replace("{{discount}}", invoice.discount)
    .replace("{{total}}", invoice.total);
};

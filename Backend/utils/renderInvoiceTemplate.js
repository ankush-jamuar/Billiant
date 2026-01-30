import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(
  __dirname,
  "../templates/invoice.template.html"
);

const template = fs.readFileSync(templatePath, "utf-8");

export const renderInvoiceTemplate = (data) => {
  if (!data || !Array.isArray(data.items)) {
    throw new Error("renderInvoiceTemplate: invalid data passed");
  }

  let itemsHtml = "";

  data.items.forEach((item) => {
    itemsHtml += `
      <tr>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>₹${item.unitPrice}</td>
        <td>₹${item.total}</td>
      </tr>
    `;
  });

  let html = template;

  html = html
    .replace("{{invoiceNumber}}", data.invoiceNumber)
    .replace("{{clientName}}", data.clientName)
    .replace("{{clientEmail}}", data.clientEmail)
    .replace("{{items}}", itemsHtml)
    .replace("{{subtotal}}", data.subtotal)
    .replace("{{tax}}", data.tax)
    .replace("{{taxAmount}}", data.taxAmount)
    .replace("{{discount}}", data.discount)
    .replace("{{total}}", data.total);

  return html;
};

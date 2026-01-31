import fs from "fs";
import path from "path";

export const renderInvoicePdf = (invoice) => {
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "invoicePdf.template.html"
  );

  let html = fs.readFileSync(templatePath, "utf-8");

  const itemsHtml = invoice.items
    .map(
      (item) => `
        <tr>
          <td>${item.description}</td>
          <td style="text-align:center">${item.quantity}</td>
          <td style="text-align:right">₹${item.unitPrice}</td>
          <td style="text-align:right">₹${item.total}</td>
        </tr>
      `
    )
    .join("");

  html = html
    .replaceAll("{{invoiceNumber}}", invoice.invoiceNumber)
    .replaceAll("{{clientName}}", invoice.clientId.name)
    .replaceAll("{{clientEmail}}", invoice.clientId.email || "-")
    .replaceAll("{{items}}", itemsHtml)
    .replaceAll("{{subtotal}}", invoice.subtotal)
    .replaceAll("{{taxPercent}}", invoice.tax)
    .replaceAll("{{taxAmount}}", invoice.taxAmount)
    .replaceAll("{{discount}}", invoice.discount)
    .replaceAll("{{total}}", invoice.total);

  return html;
};

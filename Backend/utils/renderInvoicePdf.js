import fs from "fs";
import path from "path";

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN");
};

export const renderInvoicePdf = (invoice, user) => {
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

  // ✅ CORRECT DATE HANDLING
  const today = new Date();
  const dueDateObj = invoice.dueDate
    ? new Date(invoice.dueDate)
    : null;

  let watermarkHtml = "";

  if (invoice.status === "paid") {
    watermarkHtml = `
      <div class="watermark watermark-paid">PAID</div>
    `;
  } else if (
    invoice.status !== "paid" &&
    dueDateObj &&
    dueDateObj < today
  ) {
    watermarkHtml = `
      <div class="watermark watermark-overdue">OVERDUE</div>
    `;
  }

  html = html
    .replaceAll("{{PAID_WATERMARK}}", watermarkHtml)
    .replaceAll("{{invoiceNumber}}", invoice.invoiceNumber)
    .replaceAll("{{issueDate}}", formatDate(invoice.issueDate))
    .replaceAll("{{dueDate}}", formatDate(invoice.dueDate))
    .replaceAll("{{clientName}}", invoice.clientId.name)
    .replaceAll("{{clientEmail}}", invoice.clientId.email || "-")
    .replaceAll("{{senderName}}", user.name)
    .replaceAll("{{senderEmail}}", user.email)
    .replaceAll("{{items}}", itemsHtml)
    .replaceAll("{{subtotal}}", invoice.subtotal)
    .replaceAll("{{taxPercent}}", invoice.tax)
    .replaceAll("{{taxAmount}}", invoice.taxAmount)
    .replaceAll("{{discount}}", invoice.discount)
    .replaceAll("{{total}}", invoice.total);

  return html;
};

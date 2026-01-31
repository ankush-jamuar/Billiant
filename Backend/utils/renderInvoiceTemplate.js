import fs from "fs";
import path from "path";

export const renderInvoiceTemplate = ({
  clientName,
  invoiceNumber,
  total,
  senderName,
  senderEmail,
}) => {
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "invoice.template.html"
  );

  let html = fs.readFileSync(templatePath, "utf-8");

  html = html
    .replaceAll("{{clientName}}", clientName)
    .replaceAll("{{invoiceNumber}}", invoiceNumber)
    .replaceAll("{{total}}", total)
    .replaceAll("{{senderName}}", senderName)
    .replaceAll("{{senderEmail}}", senderEmail);

  return html;
};

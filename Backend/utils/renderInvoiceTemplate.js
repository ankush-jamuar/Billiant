import fs from "fs";
import path from "path";

export const renderInvoiceTemplate = ({
  invoiceNumber,
  clientName,
  total,
  senderName,
  senderEmail,
}) => {
  const template = fs.readFileSync(
    path.resolve("templates/invoice.template.html"),
    "utf-8"
  );

  return template
    .replace("{{invoiceNumber}}", invoiceNumber)
    .replace("{{clientName}}", clientName)
    .replace("{{total}}", total)
    .replace("{{senderName}}", senderName)
    .replace("{{senderEmail}}", senderEmail);
};

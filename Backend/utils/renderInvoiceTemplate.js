import fs from "fs";
import path from "path";

const ROOT_DIR = path.resolve();

export const renderInvoiceTemplate = ({
  clientName,
  invoiceNumber,
  total,
}) => {
  const templatePath = path.join(
    ROOT_DIR,
    "templates",
    "invoice.template.html"
  );

  const template = fs.readFileSync(templatePath, "utf-8");

  return template
    .replace("{{clientName}}", clientName)
    .replace("{{invoiceNumber}}", invoiceNumber)
    .replace("{{total}}", total);
};

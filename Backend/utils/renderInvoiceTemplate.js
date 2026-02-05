import fs from "fs";
import path from "path";

export const renderInvoiceTemplate = ({
  type = "sent", // sent | overdue | paid
  clientName,
  invoiceNumber,
  total,
  issueDate,
  dueDate,
  senderName,
  senderEmail,
}) => {
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "invoice.template.html"
  );

  let html = fs.readFileSync(templatePath, "utf-8");

  // 🎨 Variant config
  const variants = {
    sent: {
      brandColor: "#4f46e5",
      statusBg: "#eef2ff",
      statusBorder: "#c7d2fe",
      statusText: "#3730a3",
      introLine: "you have received a new invoice.",
      statusMessage: "Please find your invoice attached below.",
      amountLabel: "Due",
    },
    overdue: {
      brandColor: "#dc2626",
      statusBg: "#fef2f2",
      statusBorder: "#fecaca",
      statusText: "#991b1b",
      introLine: "this invoice is now overdue.",
      statusMessage:
        "This invoice is overdue. Kindly make the payment at your earliest convenience.",
      amountLabel: "Overdue Amount",
    },
    paid: {
      brandColor: "#16a34a",
      statusBg: "#ecfdf5",
      statusBorder: "#a7f3d0",
      statusText: "#065f46",
      introLine: "payment has been successfully received.",
      statusMessage:
        "Thank you! This invoice has been fully paid.",
      amountLabel: "Total Paid",
    },
  };

  const v = variants[type];

  return html
    .replaceAll("{{clientName}}", clientName)
    .replaceAll("{{invoiceNumber}}", invoiceNumber)
    .replaceAll("{{total}}", total)
    .replaceAll("{{issueDate}}", issueDate || "-")
    .replaceAll("{{dueDate}}", dueDate || "-")
    .replaceAll("{{senderName}}", senderName)
    .replaceAll("{{senderEmail}}", senderEmail)
    .replaceAll("{{brandColor}}", v.brandColor)
    .replaceAll("{{statusBg}}", v.statusBg)
    .replaceAll("{{statusBorder}}", v.statusBorder)
    .replaceAll("{{statusText}}", v.statusText)
    .replaceAll("{{introLine}}", v.introLine)
    .replaceAll("{{statusMessage}}", v.statusMessage)
    .replaceAll("{{amountLabel}}", v.amountLabel);
};

import nodemailer from "nodemailer";

const getTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials missing in environment");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendInvoiceEmail = async ({
  to,
  subject,
  html,
  pdfBuffer,
  filename,
  replyTo,
}) => {
  if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
    throw new Error("Invalid or missing PDF buffer");
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Billiant Invoices" <${process.env.EMAIL_USER}>`,
    to,
    replyTo,
    subject,
    html,
    attachments: [
      {
        filename,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
};

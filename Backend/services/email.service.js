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

export const sendVerificationEmail = async ({ to, name, token }) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Billiant" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Inter, sans-serif">
        <h2>Welcome to Billiant, ${name} 👋</h2>
        <p>Please verify your email to secure your account.</p>
        <a href="${verifyUrl}"
           style="display:inline-block;padding:12px 20px;
                  background:#4f46e5;color:#fff;
                  border-radius:8px;text-decoration:none">
          Verify Email
        </a>
        <p style="margin-top:20px;font-size:12px;color:#666">
          Link expires in 24 hours
        </p>
      </div>
    `,
  });
};
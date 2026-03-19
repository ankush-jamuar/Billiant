import * as brevo from "@getbrevo/brevo";

const getBrevoClient = () => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY missing in environment");
  }

  const apiInstance = new brevo.TransactionalEmailsApi();

  // ✅ Correct way to set API key in @getbrevo/brevo
  const apiKey = apiInstance.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  return apiInstance;
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

  const apiInstance = getBrevoClient();

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.sender = {
    name: "Billiant Invoices",
    email: "billsatbilliant@gmail.com",
  };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.replyTo = { email: replyTo };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.attachment = [
    {
      name: filename,
      content: pdfBuffer.toString("base64"),
    },
  ];

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export const sendVerificationEmail = async ({ to, name, token }) => {
  const apiInstance = getBrevoClient();

  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.sender = {
    name: "Billiant",
    email: "billsatbilliant@gmail.com",
  };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = "Verify your email address";
  sendSmtpEmail.htmlContent = `
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
  `;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};
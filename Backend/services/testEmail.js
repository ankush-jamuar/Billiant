import { sendInvoiceEmail } from "./email.service.js";

await sendInvoiceEmail({
  to: "ankush.jamuar@gmail.com",
  subject: "Billiant Test Email",
  text: "If you got this, email works.",
  pdfBuffer: Buffer.from("TEST"),
  filename: "test.pdf",
});

console.log("DONE");

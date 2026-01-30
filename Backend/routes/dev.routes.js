import express from "express";
import fs from "fs";
import path from "path";
import { generatePdfFromHtml } from "../services/pdf.services.js";

const router = express.Router();

router.get("/test-pdf", async (req, res) => {
  const html = fs.readFileSync(
    path.resolve("./templates/invoice.template.html"),
    "utf-8"
  );

  const pdf = await generatePdfFromHtml(html);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "inline; filename=invoice.pdf",
  });

  res.send(pdf);
});

export default router;
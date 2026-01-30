import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  updateInvoice,
  downloadInvoicePdf,
  sendInvoiceByEmail
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/", protect, createInvoice);
router.get("/", protect, getInvoices);
router.get("/:id", protect, getInvoiceById);
router.patch("/:id/status", protect, updateInvoiceStatus);
router.put("/:id", protect, updateInvoice);
router.get("/:id/pdf", protect, downloadInvoicePdf);
router.post("/:id/send", protect, sendInvoiceByEmail);

export default router;

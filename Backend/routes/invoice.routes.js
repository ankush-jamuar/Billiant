import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createInvoice, getInvoices, getInvoiceById, updateInvoiceStatus } from '../controllers/invoice.controller.js';

const router = express.Router();

router.post("/", protect, createInvoice);
router.get("/", protect, getInvoices);
router.get("/:id", protect, getInvoiceById);
router.patch("/:id/status", protect, updateInvoiceStatus);

export default router;
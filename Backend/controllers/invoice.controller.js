import fs from "fs";
import path from "path";
import Invoice from "../models/invoice.model.js";
import { generatePdfFromHtml } from "../services/pdf.services.js";
import { renderInvoiceTemplate } from "../utils/renderInvoiceTemplate.js";
import { sendInvoiceEmail } from "../services/email.service.js";
import { renderInvoicePdf } from "../utils/renderInvoicePdf.js";

/* ---------------------------------
   Helpers
---------------------------------- */

const normalizeNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const calculateTotals = (items, tax = 0, discount = 0) => {
  const subtotal = items.reduce((sum, item) => {
    return (
      sum + normalizeNumber(item.quantity) * normalizeNumber(item.unitPrice)
    );
  }, 0);

  const taxPercent = normalizeNumber(tax);
  const taxAmount = (subtotal * taxPercent) / 100;
  const discountAmount = normalizeNumber(discount);

  return {
    subtotal,
    tax: taxPercent,
    taxAmount,
    discount: discountAmount,
    total: subtotal + taxAmount - discountAmount,
  };
};

/* ---------------------------------
   CREATE INVOICE
---------------------------------- */

export const createInvoice = async (req, res) => {
  try {
    const {
      clientId,
      items,
      tax = 0,
      discount = 0,
      issueDate,
      dueDate,
    } = req.body;

    if (!clientId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Client and invoice items are required",
      });
    }

    const normalizedItems = items.map((item) => {
      const quantity = normalizeNumber(item.quantity);
      const unitPrice = normalizeNumber(item.unitPrice);

      return {
        description: item.description || "",
        quantity,
        unitPrice,
        total: quantity * unitPrice,
      };
    });

    const totals = calculateTotals(normalizedItems, tax, discount);

    const invoice = await Invoice.create({
      userId: req.user._id,
      clientId,
      items: normalizedItems,
      invoiceNumber: `INV-${Date.now()}`,
      status: "draft",
      issueDate,
      dueDate,

      // 🔒 Explicit snapshot values (IMPORTANT)
      subtotal: totals.subtotal,
      tax: totals.tax,
      taxAmount: totals.taxAmount,
      discount: totals.discount,
      total: totals.total,
    });

    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (err) {
    console.error("Create invoice failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create invoice",
    });
  }
};

/* ---------------------------------
   GET ALL INVOICES
---------------------------------- */

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("clientId", "name email");

    res.json({
      success: true,
      data: invoices,
    });
  } catch (err) {
    console.error("Get invoices failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch invoices",
    });
  }
};

/* ---------------------------------
   GET SINGLE INVOICE
---------------------------------- */

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("clientId");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      data: invoice,
    });
  } catch (err) {
    console.error("Get invoice failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to load invoice",
    });
  }
};

/* ---------------------------------
   UPDATE DRAFT INVOICE
---------------------------------- */

export const updateInvoice = async (req, res) => {
  try {
    const {
      clientId,
      items,
      tax = 0,
      discount = 0,
      issueDate,
      dueDate,
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invoice items are required",
      });
    }

    const invoice = await Invoice.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (invoice.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Only draft invoices can be edited",
      });
    }

    const normalizedItems = items.map((item) => {
      const quantity = normalizeNumber(item.quantity);
      const unitPrice = normalizeNumber(item.unitPrice);

      return {
        description: item.description || "",
        quantity,
        unitPrice,
        total: quantity * unitPrice,
      };
    });

    const totals = calculateTotals(normalizedItems, tax, discount);

    invoice.clientId = clientId;
    invoice.items = normalizedItems;
    invoice.issueDate = issueDate;
    invoice.dueDate = dueDate;

    // 🔒 Explicit snapshot update
    invoice.subtotal = totals.subtotal;
    invoice.tax = totals.tax;
    invoice.taxAmount = totals.taxAmount;
    invoice.discount = totals.discount;
    invoice.total = totals.total;

    await invoice.save();

    res.json({
      success: true,
      data: invoice,
    });
  } catch (err) {
    console.error("Update invoice failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update invoice",
    });
  }
};

/* ---------------------------------
   UPDATE STATUS
---------------------------------- */

export const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const invoice = await Invoice.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({ success: false });
    }

    if (invoice.status === "paid") {
      return res.status(400).json({ success: false });
    }

    if (invoice.status === "draft" && status === "paid") {
      return res.status(400).json({ success: false });
    }

    invoice.status = status;
    await invoice.save();

    res.json({ success: true, data: invoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

/* ---------------------------------
   DOWNLOAD PDF
---------------------------------- */

export const downloadInvoicePdf = async (req, res) => {
  console.log("🔥 HIT: downloadInvoicePdf");
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    userId: req.user._id,
  }).populate("clientId");

  if (!invoice) {
    return res.status(404).json({ success: false });
  }

  const pdfHtml = renderInvoicePdf(invoice);
  const pdf = await generatePdfFromHtml(pdfHtml);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
  });

  res.send(pdf);
};

export const sendInvoiceByEmail = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("clientId");

    if (!invoice) {
      return res.status(404).json({ success: false });
    }

    // 1️⃣ Generate PDF
    const pdfHtml = renderInvoicePdf(invoice);
    const pdfBuffer = await generatePdfFromHtml(pdfHtml);

    console.log("📄 PDF SIZE:", pdfBuffer.length);
    console.log("📄 IS BUFFER:", Buffer.isBuffer(pdfBuffer));

    // 2️⃣ Email HTML (summary)
    const emailHtml = renderInvoiceTemplate({
      clientName: invoice.clientId.name,
      invoiceNumber: invoice.invoiceNumber,
      total: invoice.total,
      senderName: req.user.name,
      senderEmail: req.user.email,
    });

    // 3️⃣ Send email (CORRECT CONTRACT)
    await sendInvoiceEmail({
      to: invoice.clientId.email,
      replyTo: req.user.email,
      subject: `Invoice ${invoice.invoiceNumber}`,
      html: emailHtml,
      pdfBuffer, // ✅ REQUIRED
      filename: `${invoice.invoiceNumber}.pdf`, // ✅ REQUIRED
    });

    // 4️⃣ Update status ONLY after success
    if (invoice.status === "draft") {
      invoice.status = "sent";
      await invoice.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ SEND INVOICE FAILED:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send invoice",
    });
  }
};

export const resendInvoiceEmail = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("clientId");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (invoice.status !== "sent") {
      return res.status(400).json({
        success: false,
        message: "Only sent invoices can be resent",
      });
    }

    // 🔥 Reuse EXISTING logic
    await sendInvoiceByEmailInternal(invoice, req.user);

    return res.json({
      success: true,
      message: "Invoice resent successfully",
    });
  } catch (err) {
    console.error("❌ RESEND FAILED:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to resend invoice",
    });
  }
};

const sendInvoiceByEmailInternal = async (invoice, user) => {
  const pdfHtml = renderInvoicePdf(invoice);
  const pdfBuffer = await generatePdfFromHtml(pdfHtml);

  const emailHtml = renderInvoiceTemplate({
    clientName: invoice.clientId.name,
    invoiceNumber: invoice.invoiceNumber,
    total: invoice.total,
  });

  await sendInvoiceEmail({
    to: invoice.clientId.email,
    replyTo: user.email, // ✅ user reply-to
    subject: `Invoice ${invoice.invoiceNumber}`,
    html: emailHtml,
    pdfBuffer,
    filename: `${invoice.invoiceNumber}.pdf`,
  });
};

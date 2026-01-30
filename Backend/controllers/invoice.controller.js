import fs from "fs";
import path from "path";
import Invoice from "../models/invoice.model.js";
import { generatePdfFromHtml } from "../services/pdf.services.js";
import { renderInvoiceTemplate } from "../utils/renderInvoiceTemplate.js";

/* ---------------------------------
   Helpers
---------------------------------- */

const normalizeNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const calculateTotals = (items, tax = 0, discount = 0) => {
  const subtotal = items.reduce((sum, item) => {
    const qty = normalizeNumber(item.quantity);
    const unitPrice = normalizeNumber(item.unitPrice);
    return sum + qty * unitPrice;
  }, 0);

  const taxAmount = (subtotal * normalizeNumber(tax)) / 100;

  return {
    subtotal,
    tax: normalizeNumber(tax),
    taxAmount,
    discount: normalizeNumber(discount),
    total: subtotal + taxAmount - normalizeNumber(discount),
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
      ...totals,
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

    const allowed = ["sent", "paid"];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
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

    if (invoice.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Paid invoice cannot be changed",
      });
    }

    if (invoice.status === "draft" && status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Invoice must be sent before marking paid",
      });
    }

    invoice.status = status;
    await invoice.save();

    res.json({
      success: true,
      data: invoice,
    });
  } catch (err) {
    console.error("Update status failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update invoice status",
    });
  }
};

export const downloadInvoicePdf = async (req, res) => {
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

  const template = fs.readFileSync(
    path.resolve("src/templates/invoice.template.html"),
    "utf-8",
  );

  const html = renderInvoiceTemplate(template, invoice);
  const pdf = await generatePdfFromHtml(html);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
  });

  res.send(pdf);
};

import fs from "fs";
import path from "path";
import Invoice from "../models/invoice.model.js";
import { generatePdfFromHtml } from "../services/pdf.services.js";
import { renderInvoiceTemplate } from "../utils/renderInvoiceTemplate.js";
import { sendInvoiceEmail } from "../services/email.service.js";

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
    }).populate("clientId");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // 🔒 Guard rules
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

    // 🚨 KEY PART: only send email when draft → sent
    const shouldSendEmail = invoice.status === "draft" && status === "sent";

    invoice.status = status;
    await invoice.save();

    // 📧 SEND EMAIL ONLY HERE
    if (shouldSendEmail) {
      const templatePath = path.resolve("./templates/invoice.template.html");

      const template = fs.readFileSync(templatePath, "utf-8");

      const html = renderInvoiceTemplate({
        invoiceNumber: invoice.invoiceNumber,
        clientName: invoice.clientId.name,
        clientEmail: invoice.clientId.email,
        items: invoice.items,
        subtotal: invoice.subtotal,
        tax: invoice.tax,
        taxAmount: invoice.taxAmount,
        discount: invoice.discount,
        total: invoice.total,
      });

      const pdfBuffer = await generatePdfFromHtml(html);

      await sendInvoiceEmail({
        to: invoice.clientId.email,
        subject: `Invoice ${invoice.invoiceNumber} from Billiant`,
        html: `
          <p>Hi ${invoice.clientId.name},</p>
          <p>Please find your invoice attached.</p>
          <p>Thanks,<br/>Billiant</p>
        `,
        pdfBuffer,
        filename: `${invoice.invoiceNumber}.pdf`,
      });
    }

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

/* ---------------------------------
   DOWNLOAD PDF
---------------------------------- */

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

  // 🔒 Absolute path safety
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "invoice.template.html",
  );

  const html = renderInvoiceTemplate({
    invoiceNumber: invoice.invoiceNumber,
    clientName: invoice.clientId.name,
    clientEmail: invoice.clientId.email,

    items: invoice.items,

    subtotal: invoice.subtotal,
    tax: invoice.tax,
    taxAmount: invoice.taxAmount, // ✅ NOW GUARANTEED
    discount: invoice.discount,
    total: invoice.total,
  });

  console.log("PDF DATA:", {
    tax: invoice.tax,
    taxAmount: invoice.taxAmount,
  });

  const pdf = await generatePdfFromHtml(html);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
  });

  res.send(pdf);
};

export const sendInvoiceByEmail = async (req, res) => {
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

  if (!invoice.clientId.email) {
    return res.status(400).json({
      success: false,
      message: "Client email is missing",
    });
  }

  // 1️⃣ Generate PDF
  const html = renderInvoiceTemplate({
    invoiceNumber: invoice.invoiceNumber,
    clientName: invoice.clientId.name,
    clientEmail: invoice.clientId.email,
    items: invoice.items,
    subtotal: invoice.subtotal,
    tax: invoice.tax,
    taxAmount: invoice.taxAmount,
    discount: invoice.discount,
    total: invoice.total,
  });

  const pdfBuffer = await generatePdfFromHtml(html);

  // 2️⃣ Send email
  await sendInvoiceEmail({
    to: invoice.clientId.email,
    subject: `Invoice ${invoice.invoiceNumber}`,
    text: `Please find attached invoice ${invoice.invoiceNumber}.`,
    pdfBuffer,
    filename: `${invoice.invoiceNumber}.pdf`,
  });

  // 3️⃣ Auto status update
  if (invoice.status === "draft") {
    invoice.status = "sent";
    await invoice.save();
  }

  res.json({
    success: true,
    message: "Invoice sent successfully",
  });
};

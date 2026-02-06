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

const getEmailType = (invoice) => {
  if (invoice.status === "paid") return "paid";

  if (invoice.status === "sent") {
    const now = new Date();
    const due = new Date(invoice.dueDate);

    if (due < now) return "overdue";
  }

  return "sent";
};

const calculateTotals = (items, tax = 0, discount = 0) => {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + normalizeNumber(item.quantity) * normalizeNumber(item.unitPrice),
    0
  );

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
    const { clientId, items, tax = 0, discount = 0, issueDate, dueDate } =
      req.body;

    if (!clientId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Client and invoice items are required",
      });
    }

    const normalizedItems = items.map((item) => ({
      description: item.description || "",
      quantity: normalizeNumber(item.quantity),
      unitPrice: normalizeNumber(item.unitPrice),
      total:
        normalizeNumber(item.quantity) * normalizeNumber(item.unitPrice),
    }));

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

    return res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    console.error("Create invoice failed:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create invoice",
    });
  }
};

/* ---------------------------------
   GET INVOICES
---------------------------------- */

export const getInvoices = async (req, res) => {
  try {
    const { q, status } = req.query;

    const filter = {
      userId: req.user._id,
    };

    // 🔍 Status filter
    if (status && status !== "all") {
      filter.status = status;
    }

    let invoices = await Invoice.find(filter)
      .populate("clientId", "name email")
      .sort({ createdAt: -1 });

    // 🔍 Search (invoice number OR client name)
    if (q) {
      const search = q.toLowerCase();

      invoices = invoices.filter((inv) => {
        return (
          inv.invoiceNumber.toLowerCase().includes(search) ||
          inv.clientId?.name?.toLowerCase().includes(search)
        );
      });
    }

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

    return res.json({ success: true, data: invoice });
  } catch (err) {
    console.error("Get invoice failed:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load invoice",
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
    return res.status(404).json({ success: false });
  }

  const pdfHtml = renderInvoicePdf(invoice, req.user);
  const pdf = await generatePdfFromHtml(pdfHtml);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
  });

  return res.send(pdf);
};

/* ---------------------------------
   SEND EMAIL
---------------------------------- */

export const sendInvoiceByEmail = async (req, res) => {
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

    const sent = await sendInvoiceByEmailInternal(invoice, req.user);

    if (!sent) {
      return res.status(500).json({
        success: false,
        message: "Email failed to send",
      });
    }

    if (invoice.status === "draft") {
      invoice.status = "sent";
      await invoice.save();
    }

    return res.status(200).json({
      success: true,
      message: "Invoice sent successfully",
    });
  } catch (err) {
    console.error("❌ SEND FAILED:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send invoice",
    });
  }
};


/* ---------------------------------
   RESEND EMAIL (FIXED)
---------------------------------- */

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

    if (!["sent", "paid"].includes(invoice.status)) {
      return res.status(400).json({
        success: false,
        message: "Invoice cannot be resent",
      });
    }

    const sent = await sendInvoiceByEmailInternal(invoice, req.user);

    if (!sent) {
      return res.status(500).json({
        success: false,
        message: "Resend failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice email resent successfully",
    });
  } catch (err) {
    console.error("❌ RESEND FAILED:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to resend invoice",
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
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (invoice.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Paid invoice cannot be updated",
      });
    }

    if (invoice.status === "draft" && status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Draft invoice cannot be marked paid",
      });
    }

    invoice.status = status;
    await invoice.save();

    return res.json({ success: true, data: invoice });
  } catch (err) {
    console.error("Update invoice status failed:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update invoice status",
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

    res.json({ success: true, data: invoice });
  } catch (err) {
    console.error("Update invoice failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update invoice",
    });
  }
};

async function sendInvoiceByEmailInternal(invoice, user) {
  try {
    const pdfHtml = renderInvoicePdf(invoice, user);
    const pdfBuffer = await generatePdfFromHtml(pdfHtml);
    const emailType = getEmailType(invoice);

    const emailHtml = renderInvoiceTemplate({
      clientName: invoice.clientId.name,
      invoiceNumber: invoice.invoiceNumber,
      total: invoice.total,
      type: emailType,

      senderName: user.name,
      senderEmail: user.email,

      issueDate: invoice.issueDate
        ? invoice.issueDate.toISOString().split("T")[0]
        : "-",

      dueDate: invoice.dueDate
        ? invoice.dueDate.toISOString().split("T")[0]
        : "-",
    });


    await sendInvoiceEmail({
      to: invoice.clientId.email,
      replyTo: user.email,
      subject: `Invoice ${invoice.invoiceNumber}`,
      html: emailHtml,
      pdfBuffer,
      filename: `${invoice.invoiceNumber}.pdf`,
    });

    return true;
  } catch (err) {
    console.error("📧 EMAIL SEND FAILED:", err);
    return false;
  }
}


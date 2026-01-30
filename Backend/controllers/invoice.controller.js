import Invoice from "../models/invoice.model.js";

const calculateTotals = (items, tax = 0, discount = 0) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );

  return {
    subtotal,
    tax,
    discount,
    total: subtotal + tax - discount,
  };
};

export const createInvoice = async (req, res) => {
  const {
    clientId,
    items,
    tax = 0,
    discount = 0,
    issueDate,
    dueDate,
  } = req.body;

  if (!clientId || !items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Client and invoice items are required",
    });
  }

  const totals = calculateTotals(items, tax, discount);

  const invoice = await Invoice.create({
    userId: req.req.user._id,
    clientId,
    items: items.map((item) => ({
      ...item,
      total: item.quantity * item.unitPrice,
    })),
    invoiceNumber: `INV-${Date.now()}`, // TEMP, improved later
    status: "draft",
    ...totals,
    issueDate,
    dueDate,
  });

  res.status(201).json({
    success: true,
    data: invoice,
  });
};

export const getInvoices = async (req, res) => {
  const invoices = await Invoice.find({
    userId: req.user._id,
  })
    .sort({ createdAt: -1 })
    .populate("clientId", "name email");

  res.json({
    success: true,
    data: invoices,
  });
};

export const getInvoiceById = async (req, res) => {
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
};

export const updateInvoiceStatus = async (req, res) => {
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
};

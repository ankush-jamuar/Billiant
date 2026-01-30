import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "sent", "paid"],
      default: "draft",
    },

    items: [invoiceItemSchema],

    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      default: 0,
    },
    taxAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Invoice", invoiceSchema);

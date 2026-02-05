import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: { type: String, default: "" },
    businessEmail: { type: String, default: "" },
    businessAddress: { type: String, default: "" },

    invoicePrefix: { type: String, default: "INV" },
    currency: { type: String, default: "INR" },

    taxLabel: { type: String, default: "Tax" },
    defaultTaxRate: { type: Number, default: 0 },

    emailSignature: { type: String, default: "" },
    brandColor: { type: String, default: "#4f46e5" },

    reminderEnabled: { type: Boolean, default: false },
    reminderDaysBefore: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);

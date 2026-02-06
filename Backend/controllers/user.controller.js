import Invoice from "../models/invoice.model.js";
import Client from "../models/client.model.js";
import User from "../models/user.model.js";

/**
 * DELETE /api/users/me
 * Permanently delete user + all related data
 */
export const deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Delete invoices
    await Invoice.deleteMany({ userId });

    // 2️⃣ Delete clients
    await Client.deleteMany({ userId });

    // 3️⃣ Delete user
    await User.deleteOne({ _id: userId });

    // 4️⃣ Respond
    return res.json({
      success: true,
      message: "Account permanently deleted",
    });

  } catch (err) {
    console.error("❌ DELETE ACCOUNT FAILED:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
};

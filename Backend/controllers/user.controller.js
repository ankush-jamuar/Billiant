import bcrypt from "bcryptjs";
import Invoice from "../models/invoice.model.js";
import Client from "../models/client.model.js";
import User from "../models/user.model.js";

/**
 * DELETE /api/users/me
 * Requires password confirmation
 */
export const deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 🧹 Cascade delete
    await Invoice.deleteMany({ userId });
    await Client.deleteMany({ userId });
    await User.deleteOne({ _id: userId });

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

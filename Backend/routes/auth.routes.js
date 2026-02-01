import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { register, login, verifyEmail, resendVerificationEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/resend-verification-email", protect, resendVerificationEmail);
router.get("/verify-email", verifyEmail)
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isEmailVerified: req.user.isEmailVerified,
    },
  });
});

export default router;

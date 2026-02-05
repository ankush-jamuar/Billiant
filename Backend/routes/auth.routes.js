import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { register, login, verifyEmail, resendVerification, forgotPassword, resetPassword, getMe, updateProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/resend-verification-email", protect, resendVerification);
router.get("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);

export default router;
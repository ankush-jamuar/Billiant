import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { deleteMyAccount } from "../controllers/user.controller.js";

const router = express.Router();

router.delete("/me", protect, deleteMyAccount);

export default router;

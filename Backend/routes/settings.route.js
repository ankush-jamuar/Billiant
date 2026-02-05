import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";

const router = express.Router();

router.get("/settings", protect, getSettings);
router.put("/settings", protect, updateSettings)
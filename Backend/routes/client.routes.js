import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createClient, getClients } from "../controllers/client.controller.js";

const router = express.Router();

router.post("/", protect, createClient);
router.get("/", protect, getClients);

export default router;
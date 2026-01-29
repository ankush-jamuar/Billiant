import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth.routes.js";
import clientRoutes from "../routes/client.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

export default app;

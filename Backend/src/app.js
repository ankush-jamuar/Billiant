import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth.routes.js";
import clientRoutes from "../routes/client.routes.js";
import invoiceRoutes from "../routes/invoice.routes.js";
import dashboardRoutes from "../routes/dashboard.routes.js";
import devRoutes from "../routes/dev.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/dev", devRoutes);

export default app;

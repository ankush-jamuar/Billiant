import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "../config/db.js";

dotenv.config(); // 🔑 THIS LINE

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

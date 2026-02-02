import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "../config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();

setTimeout(() => {
  console.log("🔥 REGISTERED ROUTES:");
  app._router?.stack.forEach((layer) => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods)
        .join(",")
        .toUpperCase();
      console.log(`${methods} ${layer.route.path}`);
    } else if (layer.name === "router") {
      layer.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods)
            .join(",")
            .toUpperCase();
          console.log(`${methods} ${handler.route.path}`);
        }
      });
    }
  });
}, 0);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

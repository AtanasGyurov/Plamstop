// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import contactRouter from "./routes/contact.js";

// ✅ Load .env from the PROJECT ROOT (parent folder), because yours is not in /backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);

// ✅ Use PORT from env (fallback 5000)
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Backend running at http://localhost:${PORT}`);
  console.log("📨 SMTP_HOST:", process.env.SMTP_HOST ? "loaded" : "MISSING");
});

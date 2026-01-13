// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ---- dotenv: load FIRST, before any other imports ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try several common locations:
// 1) backend/.env when you run from backend folder
// 2) backend/.env even if you run from project root
// 3) projectRoot/.env (optional)
const candidates = [
  path.join(process.cwd(), ".env"),
  path.join(__dirname, ".env"),
  path.join(__dirname, "../.env"),
];

let loadedFrom = null;

for (const p of candidates) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
    loadedFrom = p;
    break;
  }
}

// ---- app ----
const app = express();
app.use(cors());
app.use(express.json());

// Import routes AFTER dotenv is loaded
const { default: authRouter } = await import("./routes/auth.js");
const { default: productsRouter } = await import("./routes/products.js");
const { default: ordersRouter } = await import("./routes/orders.js");
const { default: contactRouter } = await import("./routes/contact.js");
const { default: stripeRoutes } = await import("./routes/stripe.js");

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/stripe", stripeRoutes);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Backend running at http://localhost:${PORT}`);

  // ✅ Diagnostics (NO secret printing)
  console.log("🧭 process.cwd():", process.cwd());
  console.log("🧾 .env loaded from:", loadedFrom || "NONE FOUND");
  console.log(
    "🔎 .env candidates exist:",
    candidates.map((p) => `${p}=${fs.existsSync(p) ? "YES" : "no"}`).join(" | ")
  );

  console.log("📨 SMTP_HOST:", process.env.SMTP_HOST ? "loaded" : "MISSING");
  console.log("Stripe key loaded?", Boolean(process.env.STRIPE_SECRET_KEY));
  console.log("CLIENT_URL:", process.env.CLIENT_URL || "MISSING");
});

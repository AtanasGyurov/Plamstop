// backend/index.js
import express from "express";
import cors from "cors";

import productsRoutes from "./routes/products.js";
import ordersRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Log every request (for debugging)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, "Auth:", req.headers.authorization);
  next();
});

// ROUTES
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Plamstop Backend Running 🚒");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`🔥 Backend running on http://localhost:${PORT}`);
});

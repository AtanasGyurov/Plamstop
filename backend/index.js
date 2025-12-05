// backend/index.js
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

// Start server
app.listen(5000, () => {
  console.log("🔥 Backend running at http://localhost:5000");
});

import express from "express";
import cors from "cors";
import "dotenv/config";

import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health-check
app.get("/", (req, res) => {
  res.json({ message: "Plamstop backend with Firestore is running 🔥" });
});

// /api/products, /api/orders, /api/admin/orders, ...
app.use("/api", productsRouter);
app.use("/api", ordersRouter);

app.listen(PORT, () => {
  console.log(`Plamstop backend listening on port ${PORT}`);
});

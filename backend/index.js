import express from "express";
import cors from "cors";
import "dotenv/config";

import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Plamstop backend with Firestore is running 🔥" });
});

app.use("/api", productsRouter);
app.use("/api", ordersRouter);
app.use("/api", usersRouter);

app.listen(PORT, () => {
  console.log(`Plamstop backend listening on port ${PORT}`);
});

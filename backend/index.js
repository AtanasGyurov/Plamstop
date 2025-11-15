import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Plamstop backend is running 🔥" });
});

// Temporary demo products (before Firestore)
app.get("/api/products", (req, res) => {
  res.json([
    {
      id: "1",
      name: "Fire extinguisher ABC 6kg",
      price: 79,
      category: "extinguishers",
      isFireSafetyRelated: true
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Plamstop backend is listening on port ${PORT}`);
});

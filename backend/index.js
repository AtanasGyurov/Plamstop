import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";

// Firebase Admin (modern modular API)
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// 1) Load service account file
const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

// 2) Initialize Firebase app
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

// 3) Connect to Firestore WITH your database ID = "plamstop"
const db = getFirestore(firebaseApp, "plamstop");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health-check
app.get("/", (req, res) => {
  res.json({ message: "Plamstop backend with Firestore is running 🔥" });
});

// GET /api/products -> read from Firestore
app.get("/api/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (err) {
    console.error("Error getting products:", err.code, err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products -> create product in Firestore
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, category, isFireSafetyRelated } = req.body;

    if (!name || price == null) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const docRef = await db.collection("products").add({
      name,
      price,
      category: category || "other",
      isFireSafetyRelated: !!isFireSafetyRelated,
      createdAt: FieldValue.serverTimestamp(),
    });

    const saved = await docRef.get();
    res.status(201).json({ id: saved.id, ...saved.data() });
  } catch (err) {
    console.error("Error creating product:", err.code, err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.listen(PORT, () => {
  console.log(`Plamstop backend listening on port ${PORT}`);
});

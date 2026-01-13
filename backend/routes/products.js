// backend/routes/products.js
import express from "express";
import { db } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { checkAuth, checkRole } from "../middleware/auth.js";

const router = express.Router();

function cleanStr(v) {
  return (v ?? "").toString().trim();
}

function cleanNum(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/** GET all products */
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    res.json(snapshot.docs.map(mapDoc));
  } catch (err) {
    console.error("Error loading products:", err);
    res.status(500).json({ error: "Failed to load products" });
  }
});

/** ✅ GET single product (needed for edit pages) */
router.get("/:id", async (req, res) => {
  try {
    const ref = db.collection("products").doc(req.params.id);
    const snap = await ref.get();
    if (!snap.exists) return res.status(404).json({ error: "Product not found" });
    return res.json(mapDoc(snap));
  } catch (err) {
    console.error("Get product error:", err);
    return res.status(500).json({ error: "Failed to load product" });
  }
});

/** Admin: Create product */
router.post("/", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const data = req.body || {};

    const ref = await db.collection("products").add({
      name: cleanStr(data.name),
      price: cleanNum(data.price, 0),
      category: cleanStr(data.category),
      stock: cleanNum(data.stock, 0),

      // ✅ NEW
      description: cleanStr(data.description),
      imageUrl: cleanStr(data.imageUrl), // e.g. "/images/products/abc.jpg"

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const saved = await ref.get();
    res.status(201).json(mapDoc(saved));
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

/** Admin: Update product */
router.patch("/:id", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const ref = db.collection("products").doc(req.params.id);

    const snap = await ref.get();
    if (!snap.exists) return res.status(404).json({ error: "Product not found" });

    const data = req.body || {};

    const update = { updatedAt: new Date() };

    if ("name" in data) update.name = cleanStr(data.name);
    if ("price" in data) update.price = cleanNum(data.price, snap.data()?.price ?? 0);
    if ("category" in data) update.category = cleanStr(data.category);
    if ("stock" in data) update.stock = cleanNum(data.stock, snap.data()?.stock ?? 0);

    // ✅ NEW
    if ("description" in data) update.description = cleanStr(data.description);
    if ("imageUrl" in data) update.imageUrl = cleanStr(data.imageUrl);

    await ref.update(update);
    res.json(mapDoc(await ref.get()));
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

/** Admin: Delete */
router.delete("/:id", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    await db.collection("products").doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;

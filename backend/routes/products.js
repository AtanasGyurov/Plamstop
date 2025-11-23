// backend/routes/products.js
import express from "express";
import { db } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { requireAuth, checkRole } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/products
 * Public – returns all products
 */
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(mapDoc);
    return res.json(products);
  } catch (err) {
    console.error("Error loading products:", err);
    return res.status(500).json({ error: "Failed to load products" });
  }
});

/**
 * POST /api/products
 * Admin only – create product
 */
router.post("/", requireAuth, checkRole("admin"), async (req, res) => {
  try {
    const data = req.body;

    const docRef = await db.collection("products").add({
      name: data.name,
      price: Number(data.price),
      category: data.category || "",
      stock: Number(data.stock || 0),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const doc = await docRef.get();
    return res.status(201).json(mapDoc(doc));
  } catch (err) {
    console.error("Error creating product:", err);
    return res.status(500).json({ error: "Failed to create product" });
  }
});

/**
 * PATCH /api/products/:id
 * Admin only – update product
 */
router.patch("/:id", requireAuth, checkRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const docRef = db.collection("products").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    await docRef.update({
      ...data,
      updatedAt: new Date(),
    });

    const updatedDoc = await docRef.get();
    return res.json(mapDoc(updatedDoc));
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({ error: "Failed to update product" });
  }
});

/**
 * DELETE /api/products/:id
 * Admin only – delete product
 */
router.delete("/:id", requireAuth, checkRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;

    await db.collection("products").doc(id).delete();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;

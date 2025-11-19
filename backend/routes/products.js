import express from "express";
import { db, FieldValue } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";

const router = express.Router();

/**
 * GET /api/products
 * Optional query params:
 *  - category (string)
 *  - limit (number)
 */
router.get("/products", async (req, res) => {
  try {
    const { category, limit } = req.query;

    let query = db.collection("products");

    if (category) {
      query = query.where("category", "==", category);
    }

    let snapshot;
    if (limit) {
      const limitNum = Number(limit);
      snapshot = await query.limit(isNaN(limitNum) ? 50 : limitNum).get();
    } else {
      snapshot = await query.get();
    }

    const products = snapshot.docs.map(mapDoc);
    res.json(products);
  } catch (err) {
    console.error("Error getting products:", err.code, err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/**
 * GET /api/products/:id
 */
router.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = db.collection("products").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(mapDoc(doc));
  } catch (err) {
    console.error("Error getting product:", err.code, err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

/**
 * POST /api/products
 * (по-късно admin-only)
 */
router.post("/products", async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      imageUrl,
      stock,
      isFireSafetyRelated,
    } = req.body;

    if (!name || price == null) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const productData = {
      name,
      price,
      category: category || "other",
      description: description || "",
      imageUrl: imageUrl || "",
      stock: stock ?? 0,
      isFireSafetyRelated: !!isFireSafetyRelated,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("products").add(productData);
    const saved = await docRef.get();

    res.status(201).json(mapDoc(saved));
  } catch (err) {
    console.error("Error creating product:", err.code, err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
});

/**
 * PUT /api/products/:id
 * Update existing product fields
 */
router.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const allowedFields = [
      "name",
      "price",
      "category",
      "description",
      "imageUrl",
      "stock",
      "isFireSafetyRelated",
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided for update" });
    }

    updates.updatedAt = FieldValue.serverTimestamp();

    const docRef = db.collection("products").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    await docRef.update(updates);
    const updatedDoc = await docRef.get();

    res.json(mapDoc(updatedDoc));
  } catch (err) {
    console.error("Error updating product:", err.code, err.message);
    res.status(500).json({ error: "Failed to update product" });
  }
});

/**
 * DELETE /api/products/:id
 */
router.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = db.collection("products").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    await docRef.delete();

    res.json({ message: "Product deleted successfully", id });
  } catch (err) {
    console.error("Error deleting product:", err.code, err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;

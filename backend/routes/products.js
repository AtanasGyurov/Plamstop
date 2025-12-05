// backend/routes/products.js
import express from "express";
import { db } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { checkAuth, checkRole } from "../middleware/auth.js";

const router = express.Router();

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

/** Admin: Create product */
router.post("/", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const data = req.body;

    const ref = await db.collection("products").add({
      name: data.name,
      price: Number(data.price),
      category: data.category || "",
      stock: Number(data.stock ?? 0),
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

    if (!(await ref.get()).exists)
      return res.status(404).json({ error: "Product not found" });

    await ref.update({
      ...req.body,
      updatedAt: new Date(),
    });

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

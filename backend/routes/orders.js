import express from "express";
import { db } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { checkAuth, checkRole } from "../middleware/auth.js";

const router = express.Router();

/** USER — GET OWN ORDERS */
router.get("/", checkAuth, async (req, res) => {
  try {
    const email = req.user.email;

    const snap = await db
      .collection("orders")
      .where("customerEmail", "==", email)
      .orderBy("createdAt", "desc")
      .get();

    res.json(snap.docs.map(mapDoc));
  } catch (err) {
    console.error("User order error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/** PUBLIC — CREATE ORDER */
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const order = {
      ...data,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const ref = await db.collection("orders").add(order);
    const saved = await ref.get();

    res.status(201).json(mapDoc(saved));
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

/** USER — CANCEL ORDER */
router.patch("/:id/cancel", checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const ref = db.collection("orders").doc(id);
    const doc = await ref.get();

    if (!doc.exists) return res.status(404).json({ error: "Order not found" });

    const order = doc.data();

    if (order.customerEmail !== req.user.email)
      return res.status(403).json({ error: "Not your order" });

    if (!["pending", "confirmed"].includes(order.status))
      return res.status(400).json({ error: "Cannot cancel" });

    await ref.update({
      status: "cancelled",
      updatedAt: new Date(),
    });

    const updated = await ref.get();
    res.json(mapDoc(updated));
  } catch (err) {
    console.error("Cancel error:", err);
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

/** ADMIN — ALL ORDERS */
router.get("/admin/orders", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const snap = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    res.json(snap.docs.map(mapDoc));
  } catch (err) {
    console.error("Admin orders error:", err);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
});

export default router;

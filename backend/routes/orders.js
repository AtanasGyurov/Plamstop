// backend/routes/orders.js
import express from "express";
import { db } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { checkAuth, checkRole } from "../middleware/auth.js";

const router = express.Router();

/** USER — GET own orders */
router.get("/", checkAuth, async (req, res) => {
  try {
    const snap = await db
      .collection("orders")
      .where("customerEmail", "==", req.user.email)
      // ⛔ removed orderBy to avoid composite-index problems
      .get();

    res.json(snap.docs.map(mapDoc));
  } catch (err) {
    console.error("User order error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/** PUBLIC — CREATE order */
router.post("/", async (req, res) => {
  try {
    const order = {
      ...req.body,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const ref = await db.collection("orders").add(order);
    res.status(201).json(mapDoc(await ref.get()));
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

/** USER — CANCEL order */
router.patch("/:id/cancel", checkAuth, async (req, res) => {
  try {
    const ref = db.collection("orders").doc(req.params.id);
    const snap = await ref.get();

    if (!snap.exists) return res.status(404).json({ error: "Order not found" });

    const order = snap.data();

    if (order.customerEmail !== req.user.email)
      return res.status(403).json({ error: "Not your order" });

    if (!["pending", "confirmed"].includes(order.status))
      return res.status(400).json({ error: "Cannot cancel this order" });

    await ref.update({
      status: "cancelled",
      updatedAt: new Date(),
    });

    res.json(mapDoc(await ref.get()));
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
      .orderBy("createdAt", "desc") // this is fine for admins
      .get();

    res.json(snap.docs.map(mapDoc));
  } catch (err) {
    console.error("Admin orders error:", err);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
});

export default router;

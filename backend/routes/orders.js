// backend/routes/orders.js
import express from "express";
import { db } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { checkAuth, checkRole } from "../middleware/auth.js";

const router = express.Router();

/** ------------------------------------------------------
 * USER — GET OWN ORDERS
 * ------------------------------------------------------ */
router.get("/", checkAuth, async (req, res) => {
  try {
    const snap = await db
      .collection("orders")
      .where("customerEmail", "==", req.user.email)
      .get();

    res.json(snap.docs.map(mapDoc));
  } catch (err) {
    console.error("User order error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/** ------------------------------------------------------
 * PUBLIC — CREATE ORDER
 * ------------------------------------------------------ */
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

/** ------------------------------------------------------
 * USER — CANCEL OWN ORDER
 * ------------------------------------------------------ */
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

/** ------------------------------------------------------
 * ADMIN — GET ALL ORDERS
 * ------------------------------------------------------ */
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

/** ------------------------------------------------------
 * ADMIN — UPDATE ORDER STATUS
 * ------------------------------------------------------ */
router.patch("/:id/status", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const newStatus = req.body.status;
    const valid = ["pending", "confirmed", "shipped", "completed", "cancelled"];

    if (!valid.includes(newStatus)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const ref = db.collection("orders").doc(req.params.id);
    const snap = await ref.get();

    if (!snap.exists) return res.status(404).json({ error: "Order not found" });

    await ref.update({
      status: newStatus,
      updatedAt: new Date(),
    });

    res.json(mapDoc(await ref.get()));
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

/** ------------------------------------------------------
 * ADMIN — DELETE ORDER
 * ------------------------------------------------------ */
router.delete("/admin/orders/:id", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const ref = db.collection("orders").doc(req.params.id);
    const snap = await ref.get();

    if (!snap.exists)
      return res.status(404).json({ error: "Order not found" });

    await ref.delete();
    res.json({ success: true });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

export default router;

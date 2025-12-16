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

    const orders = snap.docs.map(mapDoc);

    // Локално сортиране (без composite index)
    orders.sort((a, b) => {
      const aMs =
        a?.createdAt?.toMillis?.() ??
        (typeof a?.createdAt === "string" ? Date.parse(a.createdAt) : 0) ??
        0;

      const bMs =
        b?.createdAt?.toMillis?.() ??
        (typeof b?.createdAt === "string" ? Date.parse(b.createdAt) : 0) ??
        0;

      return bMs - aMs;
    });

    return res.json(orders);
  } catch (err) {
    console.error("User order error:", err);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/** ------------------------------------------------------
 * AUTH — CREATE ORDER (важно!)
 * ------------------------------------------------------ */
router.post("/", checkAuth, async (req, res) => {
  try {
    const data = req.body || {};

    const items = Array.isArray(data.items) ? data.items : [];
    const totalAmount =
      typeof data.totalAmount === "number"
        ? data.totalAmount
        : items.reduce(
            (sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 0),
            0
          );

    // 🔥 ВАЖНО: customerEmail идва от токена, НЕ от клиента
    const order = {
      ...data,
      customerEmail: req.user.email,
      customerUid: req.user.uid,

      status: "pending",
      totalAmount,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const ref = await db.collection("orders").add(order);
    const saved = await ref.get();

    return res.status(201).json(mapDoc(saved));
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ error: "Failed to create order" });
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

    return res.json(mapDoc(await ref.get()));
  } catch (err) {
    console.error("Cancel error:", err);
    return res.status(500).json({ error: "Failed to cancel order" });
  }
});

/** ------------------------------------------------------
 * ADMIN — GET ALL ORDERS
 * ------------------------------------------------------ */
router.get("/admin/orders", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const snap = await db.collection("orders").orderBy("createdAt", "desc").get();
    return res.json(snap.docs.map(mapDoc));
  } catch (err) {
    console.error("Admin orders error:", err);
    return res.status(500).json({ error: "Failed to fetch all orders" });
  }
});

/** ------------------------------------------------------
 * ADMIN — UPDATE ORDER STATUS
 * ------------------------------------------------------ */
router.patch("/:id/status", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const newStatus = req.body?.status;
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

    return res.json(mapDoc(await ref.get()));
  } catch (err) {
    console.error("Status update error:", err);
    return res.status(500).json({ error: "Failed to update order status" });
  }
});

/** ------------------------------------------------------
 * ADMIN — DELETE ORDER
 * ------------------------------------------------------ */
router.delete("/admin/orders/:id", checkAuth, checkRole("admin"), async (req, res) => {
  try {
    const ref = db.collection("orders").doc(req.params.id);
    const snap = await ref.get();

    if (!snap.exists) return res.status(404).json({ error: "Order not found" });

    await ref.delete();
    return res.json({ success: true });
  } catch (err) {
    console.error("Delete order error:", err);
    return res.status(500).json({ error: "Failed to delete order" });
  }
});

export default router;

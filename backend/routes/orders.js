import express from "express";
import { db, FieldValue } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { checkRole } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/orders
 * Временно връща всички поръчки (за тест).
 * По-късно може да ги филтрираме по userId.
 */
router.get("/orders", async (req, res) => {
  try {
    const snapshot = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    const orders = snapshot.docs.map(mapDoc);
    res.json(orders);
  } catch (err) {
    console.error("Error getting orders:", err.code, err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/**
 * POST /api/orders
 * Създава поръчка от клиента.
 */
router.post("/orders", async (req, res) => {
  try {
    const { customerName, customerEmail, customerAddress, note, items } =
      req.body;

    if (!customerName || !customerEmail || !Array.isArray(items)) {
      return res.status(400).json({
        error: "customerName, customerEmail and items array are required",
      });
    }

    if (items.length === 0) {
      return res.status(400).json({
        error: "Order must contain at least one item",
      });
    }

    const orderData = {
      customerName,
      customerEmail,
      customerAddress: customerAddress || "",
      note: note || "",
      items,
      status: "pending", // pending | confirmed | shipped | completed | cancelled
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      // TODO: userId (когато вържем Firebase Auth)
    };

    const docRef = await db.collection("orders").add(orderData);
    const saved = await docRef.get();

    res.status(201).json(mapDoc(saved));
  } catch (err) {
    console.error("Error creating order:", err.code, err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

/**
 * GET /api/admin/orders
 * Admin list на всички поръчки.
 */
router.get("/admin/orders", checkRole("admin"), async (req, res) => {
  try {
    const snapshot = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    const orders = snapshot.docs.map(mapDoc);
    res.json(orders);
  } catch (err) {
    console.error("Error getting orders:", err.code, err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/**
 * GET /api/admin/orders/:id
 * Една поръчка по id.
 */
router.get("/admin/orders/:id", checkRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = db.collection("orders").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(mapDoc(doc));
  } catch (err) {
    console.error("Error getting order:", err.code, err.message);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

/**
 * PATCH /api/admin/orders/:id/status
 * Промяна на статус на поръчка.
 * Body: { "status": "confirmed" }
 */
router.patch("/admin/orders/:id/status", checkRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const docRef = db.collection("orders").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Order not found" });
    }

    await docRef.update({
      status,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const updatedDoc = await docRef.get();
    res.json(mapDoc(updatedDoc));
  } catch (err) {
    console.error("Error updating order status:", err.code, err.message);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

export default router;

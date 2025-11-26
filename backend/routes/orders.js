// backend/routes/orders.js

import express from "express";
import { db } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { requireAuth, checkRole } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/orders  (User: list own orders)
 */
router.get("/", requireAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;

    const snapshot = await db
      .collection("orders")
      .where("customerEmail", "==", userEmail)
      .orderBy("createdAt", "desc")
      .get()
      .catch((err) => {
        console.error("Firestore user order error:", err);
        return { docs: [] };
      });

    res.json(snapshot.docs.map(mapDoc));
  } catch (err) {
    console.error("Error getting user orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/**
 * POST /api/orders  (Create new order)
 */
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerAddress,
      note,
      items,
      totalAmount,
      createdAt,
    } = req.body;

    const orderData = {
      customerName,
      customerEmail,
      customerAddress,
      note,
      items,
      totalAmount,
      status: "pending",
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      updatedAt: new Date(),
    };

    const docRef = await db.collection("orders").add(orderData);
    const saved = await docRef.get();

    res.status(201).json(mapDoc(saved));
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

/**
 * USER CANCEL ORDER
 */
router.patch("/:id/cancel", requireAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const docRef = db.collection("orders").doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = snapshot.data();

    if (order.customerEmail !== req.user.email) {
      return res.status(403).json({ error: "Not your order" });
    }

    if (order.status !== "pending" && order.status !== "confirmed") {
      return res.status(400).json({ error: "Order cannot be cancelled" });
    }

    await docRef.update({
      status: "cancelled",
      updatedAt: new Date(),
    });

    const updated = await docRef.get();
    res.json(mapDoc(updated));
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

/**
 * ADMIN GET ALL ORDERS
 */
router.get("/admin/orders", requireAuth, checkRole("admin"), async (req, res) => {
  try {
    const snapshot = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get()
      .catch((err) => {
        console.error("Firestore admin order error:", err);
        return { docs: [] };
      });

    res.json(snapshot.docs.map(mapDoc));
  } catch (err) {
    console.error("Error fetching admin orders:", err);
    res.status(500).json({ error: "Failed to fetch admin orders" });
  }
});

export default router;

// backend/routes/orders.js
import express from "express";
import { db, FieldValue } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";
import { requireAuth, checkRole } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/orders
 * Client: list own orders
 * For now, returns all orders (can filter later)
 */
router.get("/", requireAuth, async (req, res) => {
  try {
    const snapshot = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    const orders = snapshot.docs.map(mapDoc);
    res.json(orders);
  } catch (err) {
    console.error("Error getting orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/**
 * POST /api/orders
 * Create new order
 */
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, customerAddress, note, items } =
      req.body;

    const orderData = {
      customerName,
      customerEmail,
      customerAddress: customerAddress || "",
      note: note || "",
      items,
      status: "pending",
      createdAt: new Date(),
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

/* ============================================================
   ADMIN ROUTES
   ============================================================ */

/**
 * GET /api/admin/orders
 * Admin only
 */
router.get("/admin/orders", requireAuth, checkRole("admin"), async (req, res) => {
  try {
    const snapshot = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    const orders = snapshot.docs.map(mapDoc);
    res.json(orders);
  } catch (err) {
    console.error("Error fetching admin orders:", err);
    res.status(500).json({ error: "Failed to fetch admin orders" });
  }
});

/**
 * PATCH /api/admin/orders/:id/status
 * Admin update order status
 */
router.patch(
  "/admin/orders/:id/status",
  requireAuth,
  checkRole("admin"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;

      const allowed = [
        "pending",
        "confirmed",
        "shipped",
        "completed",
        "cancelled",
      ];
      if (!allowed.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const docRef = db.collection("orders").doc(id);
      await docRef.update({
        status,
        updatedAt: new Date(),
      });

      const updated = await docRef.get();
      res.json(mapDoc(updated));
    } catch (err) {
      console.error("Error updating order:", err);
      res.status(500).json({ error: "Failed to update order" });
    }
  }
);

export default router;

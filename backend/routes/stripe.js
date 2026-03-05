// backend/routes/stripe.js
import express from "express";
import Stripe from "stripe";
import { db } from "../firebase.js";
import { mapDoc } from "../utils/mapDoc.js";

const router = express.Router();

// CREATE CHECKOUT SESSION
router.post("/create-checkout-session", async (req, res) => {
  try {
    const key = process.env.STRIPE_SECRET_KEY;

    if (!key) {
      return res.status(500).json({
        error:
          "Missing STRIPE_SECRET_KEY. Check that backend .env is loaded and contains STRIPE_SECRET_KEY.",
      });
    }

    const stripe = new Stripe(key);

    const { items, customer } = req.body || {};
    const safeItems = Array.isArray(items) ? items : [];

    const line_items = safeItems.map((i) => ({
      quantity: Number(i.quantity || 1),
      price_data: {
        currency: "eur",
        product_data: { name: String(i.name || "Product") },
        unit_amount: Math.round(Number(i.price || 0) * 100),
      },
    }));

    const totalAmount = safeItems.reduce(
      (sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 0),
      0
    );

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customer?.email,

      // store order info so confirm can rebuild items reliably
      metadata: {
        items: JSON.stringify(
          safeItems.map((i) => ({
            id: i.id || "",
            name: i.name || "",
            price: Number(i.price || 0),
            quantity: Number(i.quantity || 1),
          }))
        ),
        totalAmount: String(totalAmount),
      },

      success_url: `${clientUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/checkout/cancel`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
});

/**
 * ✅ CONFIRM SESSION -> CREATE ORDER IN FIRESTORE
 * Public endpoint (NO checkAuth) because token may not be ready after Stripe redirect.
 */
router.post("/confirm", async (req, res) => {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });

    const { sessionId } = req.body || {};
    if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

    const stripe = new Stripe(key);

    // 1) idempotency: already saved?
    const existingSnap = await db
      .collection("orders")
      .where("stripeSessionId", "==", sessionId)
      .limit(1)
      .get();

    if (!existingSnap.empty) {
      return res.json({ created: false, order: mapDoc(existingSnap.docs[0]) });
    }

    // 2) retrieve session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // allow only PAID sessions to create orders
    if (session?.payment_status !== "paid") {
      return res.status(400).json({
        error: `Session not paid. payment_status=${session?.payment_status || "unknown"}`,
      });
    }

    // 3) email from Stripe (most reliable after payment)
    const customerEmail = (
      session?.customer_details?.email ||
      session?.customer_email ||
      ""
    )
      .toString()
      .trim();

    // 4) rebuild items from metadata
    let items = [];
    const rawItems = session?.metadata?.items;
    if (rawItems) {
      try {
        const parsed = JSON.parse(rawItems);
        if (Array.isArray(parsed)) items = parsed;
      } catch (e) {
        // ignore
      }
    }

    // fallback: line items
    if (!items.length) {
      const li = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
      items = (li.data || []).map((x) => ({
        id: "",
        name: x.description || "Product",
        price:
          Number(x.amount_total || 0) / 100 / Math.max(1, Number(x.quantity || 1)),
        quantity: Number(x.quantity || 1),
      }));
    }

    const totalAmount =
      typeof session?.amount_total === "number"
        ? Number(session.amount_total) / 100
        : Number(session?.metadata?.totalAmount || 0);

    const order = {
      customerEmail,
      customerUid: "",

      status: "pending",
      paymentStatus: "paid",

      items,
      totalAmount,

      stripeSessionId: sessionId,
      stripePaymentIntent: session?.payment_intent || "",

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const ref = await db.collection("orders").add(order);
    const saved = await ref.get();

    return res.status(201).json({ created: true, order: mapDoc(saved) });
  } catch (err) {
    console.error("Stripe confirm error:", err);
    return res.status(500).json({ error: "Failed to confirm session / create order" });
  }
});

export default router;
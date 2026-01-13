// backend/routes/stripe.js
import express from "express";
import Stripe from "stripe";

const router = express.Router();

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

    const line_items = (items || []).map((i) => ({
      quantity: Number(i.quantity || 1),
      price_data: {
        currency: "eur",
        product_data: { name: String(i.name || "Product") },
        unit_amount: Math.round(Number(i.price || 0) * 100),
      },
    }));

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customer?.email,
      success_url: `${clientUrl}/shop?payment=success`,
      cancel_url: `${clientUrl}/shop?payment=cancel`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;

import express from "express";
import { db, FieldValue } from "../firebase.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/auth/sync
 */
router.post("/sync", checkAuth, async (req, res) => {
  try {
    const { uid, email, name } = req.user;

    const ref = db.collection("users").doc(uid);
    const doc = await ref.get();

    if (!doc.exists) {
      // Create user ONLY ONCE
      await ref.set({
        uid,
        email: email || "",
        name: name || "",
        role: "client", // default
        createdAt: FieldValue.serverTimestamp(),
      });
    } else {
      // Update email and name — DO NOT UPDATE ROLE
      await ref.update({
        email: email || doc.data().email,
        name: name || doc.data().name,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Error syncing user profile:", err);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

/**
 * GET /api/auth/me
 */
router.get("/me", checkAuth, async (req, res) => {
  try {
    const { uid, email } = req.user;

    const ref = db.collection("users").doc(uid);
    const doc = await ref.get();

    let role = "client";
    let name = "";

    if (doc.exists) {
      const data = doc.data();
      role = data.role || "client";
      name = data.name || "";
    }

    res.json({ uid, email, name, role });
  } catch (err) {
    console.error("Error getting current user:", err);
    res.status(500).json({ error: "Failed to get current user" });
  }
});

export default router;

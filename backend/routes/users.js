import express from "express";
import { db, FieldValue } from "../firebase.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/auth/sync
 * Създава/актуализира профил в users за логнатия user.
 */
router.post("/auth/sync", requireAuth, async (req, res) => {
  try {
    const { uid, email, name } = req.user;
    const ref = db.collection("users").doc(uid);
    const doc = await ref.get();

    if (!doc.exists) {
      await ref.set({
        email: email || "",
        name: name || "",
        role: "client",
        createdAt: FieldValue.serverTimestamp(),
      });
    } else {
      await ref.update({
        email: email || doc.data().email || "",
        name: name || doc.data().name || "",
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Error syncing user profile:", err.code, err.message);
    res.status(500).json({ error: "Failed to sync user profile" });
  }
});

/**
 * GET /api/me
 * Връща uid/email/role за текущия user.
 */
router.get("/me", requireAuth, async (req, res) => {
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
    console.error("Error getting current user:", err.code, err.message);
    res.status(500).json({ error: "Failed to get current user" });
  }
});

export default router;

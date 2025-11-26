import express from "express";
import { db } from "../firebase.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/auth/sync
 * Store users by UID (CORRECT)
 */
router.post("/sync", checkAuth, async (req, res) => {
  try {
    const uid = req.user.uid;
    const email = req.user.email;
    const name = req.user.name || null;

    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      // new user
      await userRef.set({
        uid,
        email,
        name,
        role: "client",   // default
        createdAt: new Date(),
      });
    } else {
      // update email + name only
      await userRef.set(
        {
          email,
          name,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    }

    const finalData = (await userRef.get()).data();
    res.json(finalData);

  } catch (err) {
    console.error("auth/sync error:", err);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

/**
 * GET /api/auth/me
 * Return user by UID (CORRECT)
 */
router.get("/me", checkAuth, async (req, res) => {
  try {
    const uid = req.user.uid;

    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      return res.json({ uid, email: req.user.email, role: "client" });
    }

    res.json(snap.data());
  } catch (err) {
    console.error("auth/me error:", err);
    res.status(500).json({ error: "Failed to load user profile" });
  }
});

export default router;

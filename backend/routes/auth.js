// backend/routes/auth.js
import express from "express";
import { db } from "../firebase.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

// --------------------
// SYNC USER ON LOGIN
// --------------------
router.post("/sync", checkAuth, async (req, res) => {
  try {
    const uid = req.user.uid;
    const ref = db.collection("users").doc(uid);
    const snap = await ref.get();

    // If user does not exist → create it (default role = client)
    if (!snap.exists) {
      await ref.set({
        email: req.user.email,
        name: req.user.name || "",
        role: "client", // do NOT overwrite existing users
        createdAt: new Date()
      });

      return res.json({
        email: req.user.email,
        name: "",
        role: "client"
      });
    }

    // If user exists → return their Firestore data
    const data = snap.data();

    return res.json({
      email: data.email,
      name: data.name || "",
      role: data.role || "client"
    });

  } catch (err) {
    console.error("Sync error:", err);
    return res.status(500).json({ error: "Failed to sync user" });
  }
});

// --------------------
// GET USER PROFILE
// --------------------
router.get("/me", checkAuth, async (req, res) => {
  try {
    const snap = await db.collection("users").doc(req.user.uid).get();

    if (!snap.exists)
      return res.status(404).json({ error: "User not found" });

    return res.json(snap.data());

  } catch (err) {
    console.error("ME error:", err);
    return res.status(500).json({ error: "Failed to get user" });
  }
});

export default router;

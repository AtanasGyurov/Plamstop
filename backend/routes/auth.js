// backend/routes/auth.js
import express from "express";
import { db } from "../firebase.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/auth/sync
 * Създава/обновява запис в users колекцията за текущия потребител.
 * Използва ролята, която вече имаш ръчно задали в Firestore (role: "admin" и т.н.)
 */
router.post("/sync", checkAuth, async (req, res) => {
  try {
    const { uid, email, name } = {
      uid: req.user.uid,
      email: req.user.email || null,
      name: req.user.name || null,
    };

    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      await userRef.set({
        email,
        name,
        role: "client",
        createdAt: new Date(),
      });
    } else {
      // не пипаме role, само обновяваме email/name ако са се променили
      await userRef.set(
        {
          email,
          name,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("auth/sync error:", err);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

/**
 * GET /api/auth/me
 * Връща потребителя от users колекцията + role
 */
router.get("/me", checkAuth, async (req, res) => {
  try {
    const uid = req.user.uid;
    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      // ако няма запис, връщаме минимална информация
      return res.json({
        id: uid,
        email: req.user.email || null,
        role: "client",
      });
    }

    res.json({ id: snap.id, ...snap.data() });
  } catch (err) {
    console.error("auth/me error:", err);
    res.status(500).json({ error: "Failed to load user profile" });
  }
});

export default router;

// backend/routes/auth.js
import express from "express";
import { auth, db } from "../firebase.js";

const router = express.Router();

/**
 * Reads Firebase ID token from:
 *  - Authorization: Bearer <token>
 * or
 *  - x-access-token: <token>  (optional fallback)
 */
function getTokenFromReq(req) {
  const h = req.headers.authorization || "";
  if (h.startsWith("Bearer ")) return h.slice(7);
  return req.headers["x-access-token"] || null;
}

router.post("/sync", async (req, res) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) return res.status(401).json({ error: "Missing auth token" });

    // Verify Firebase ID token
    const decoded = await auth.verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email || "";

    // Read optional profile fields from client (register sends them)
    const rawName = (req.body?.name ?? "").toString().trim();
    const rawFirstName = (req.body?.firstName ?? "").toString().trim();
    const rawLastName = (req.body?.lastName ?? "").toString().trim();

    // Build a safe name (don’t overwrite with empty)
    const computedName =
      rawName ||
      [rawFirstName, rawLastName].filter(Boolean).join(" ").trim() ||
      "";

    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    // Default role
    let role = "client";

    if (!snap.exists) {
      // Create user doc first time
      await userRef.set(
        {
          email,
          role: "client",
          name: computedName, // ✅ save name
          firstName: rawFirstName || "",
          lastName: rawLastName || "",
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );
      role = "client";
    } else {
      const existing = snap.data() || {};
      role = existing.role || "client";

      // ✅ Only update name fields if we actually received something non-empty
      const update = {};
      if (computedName) update.name = computedName;
      if (rawFirstName) update.firstName = rawFirstName;
      if (rawLastName) update.lastName = rawLastName;

      // also keep email up-to-date (optional)
      if (email && existing.email !== email) update.email = email;

      if (Object.keys(update).length > 0) {
        await userRef.set(update, { merge: true });
      }
    }

    // Return profile to client
    const fresh = await userRef.get();
    const data = fresh.data() || {};

    return res.json({
      email: data.email || email,
      role: data.role || role,
      name: data.name || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
    });
  } catch (err) {
    console.error("Auth sync error:", err);
    return res.status(500).json({ error: "Auth sync failed" });
  }
});

export default router;

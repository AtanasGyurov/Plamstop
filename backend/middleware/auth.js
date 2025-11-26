// backend/middleware/auth.js
import { auth } from "../firebase.js";
import { db } from "../firebase.js";

// Extract Bearer token
function getToken(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;
  return header.substring(7);
}

/**
 * BASIC TOKEN VERIFICATION
 */
export async function checkAuth(req, res, next) {
  const token = getToken(req);
  if (!token)
    return res.status(401).json({ error: "Missing Authorization token" });

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded; // contains uid + email
    next();
  } catch (err) {
    console.error("checkAuth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/**
 * PROTECTED ROUTE AUTH
 */
export async function requireAuth(req, res, next) {
  const token = getToken(req);
  if (!token)
    return res.status(401).json({ error: "Missing Authorization token" });

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("requireAuth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/**
 * ROLE CHECK USING UID
 */
export function checkRole(requiredRole) {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.uid) {
        console.log("❌ No req.user present");
        return res.status(401).json({ error: "Not authenticated" });
      }

      const uid = req.user.uid;
      console.log("🔍 Checking role for UID:", uid);

      const userRef = db.collection("users").doc(uid);
      const snap = await userRef.get();

      if (!snap.exists) {
        console.log("❌ User doc NOT FOUND:", uid);
        return res.status(403).json({ error: "User profile not found" });
      }

      const data = snap.data();
      console.log("📄 Loaded user doc data:", data);

      const role = data.role || "client";
      console.log("🎭 ROLE FROM FIRESTORE:", role);

      if (role !== requiredRole) {
        console.log("❌ Permission denied. Required:", requiredRole, "Got:", role);
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      console.log("✅ Role verified successfully.");
      next();
    } catch (err) {
      console.error("checkRole error:", err);
      res.status(500).json({ error: "Role verification failed" });
    }
  };
}
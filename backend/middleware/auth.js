import { auth } from "../firebase.js";
import { db } from "../firebase.js";

// Extract token
function getToken(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;
  return header.substring(7);
}

export async function checkAuth(req, res, next) {
  const token = getToken(req);
  if (!token)
    return res.status(401).json({ error: "Missing Authorization token" });

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("checkAuth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function checkRole(requiredRole) {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.uid)
        return res.status(401).json({ error: "Not authenticated" });

      const userRef = db.collection("users").doc(req.user.uid);
      const snap = await userRef.get();

      if (!snap.exists)
        return res.status(403).json({ error: "User profile not found" });

      const role = snap.data().role || "client";

      if (role !== requiredRole)
        return res.status(403).json({ error: "Insufficient permissions" });

      next();
    } catch (err) {
      console.error("checkRole error:", err);
      res.status(500).json({ error: "Role verification failed" });
    }
  };
}

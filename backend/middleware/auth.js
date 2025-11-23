// backend/middleware/auth.js
import { auth } from "../firebase.js";
import { db } from "../firebase.js";

//
// Extract token helper
//
function getToken(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;
  return header.substring(7);
}

//
// Used by routes that simply require user to be logged in
//
export async function checkAuth(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization token" });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("checkAuth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

//
// Used for routes requiring authentication AND attaching user
//
export async function requireAuth(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization token" });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("requireAuth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

//
// Used for admin-only routes
//
export function checkRole(requiredRole) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const uid = req.user.uid;
      const userDoc = await db.collection("users").doc(uid).get();

      if (!userDoc.exists) {
        return res.status(403).json({ error: "User profile not found" });
      }

      const role = userDoc.data().role || "client";

      if (role !== requiredRole) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      next();
    } catch (err) {
      console.error("checkRole error:", err);
      res.status(500).json({ error: "Role verification failed" });
    }
  };
}

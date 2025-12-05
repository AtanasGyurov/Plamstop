// backend/middleware/auth.js
import { auth, db } from "../firebase.js";

function getToken(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;
  return header.split(" ")[1];
}

export async function checkAuth(req, res, next) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded; // contains uid + email
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
}

export function checkRole(requiredRole) {
  return async (req, res, next) => {
    try {
      const snap = await db.collection("users").doc(req.user.uid).get();
      if (!snap.exists) return res.status(403).json({ error: "User not found" });

      const role = snap.data().role;

      if (role !== requiredRole)
        return res.status(403).json({ error: "Forbidden" });

      next();
    } catch (err) {
      console.error("Role error:", err);
      res.status(500).json({ error: "Role check failed" });
    }
  };
}

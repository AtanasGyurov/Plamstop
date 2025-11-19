import { auth, db } from "../firebase.js";

// Проверява Firebase ID token от header: Authorization: Bearer <token>
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid Authorization header" });
    }

    const token = header.substring("Bearer ".length).trim();
    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    const decoded = await auth.verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || "",
      name: decoded.name || "",
      raw: decoded,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err.code, err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Проверява роля в колекцията users (role: "admin" и т.н.)
export function checkRole(requiredRole) {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const userRef = db.collection("users").doc(req.user.uid);
      const doc = await userRef.get();

      if (!doc.exists) {
        return res.status(403).json({ error: "User profile not found" });
      }

      const data = doc.data();
      const role = data.role || "client";

      if (role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }

      req.userRole = role;
      next();
    } catch (err) {
      console.error("Role check error:", err.code, err.message);
      return res.status(500).json({ error: "Role check failed" });
    }
  };
}

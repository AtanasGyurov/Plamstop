// client/src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseClient";
import api from "../api"; // ✅ ONLY import api
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  // 🔥 Helper: Sync user profile with backend
  async function fetchUserProfile() {
    try {
      const res = await api.post("/auth/sync");
      return res.data; // { email, name, role }
    } catch (err) {
      console.error("Failed to sync user:", err);
      return null;
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setRole(null);
        setToken(null);
        localStorage.removeItem("token");
        return;
      }

      // Get Firebase token
      const token = await firebaseUser.getIdToken();
      setToken(token);
      localStorage.setItem("token", token);

      // 🔥 Sync + Fetch Firestore user role
      const profile = await fetchUserProfile();

      setUser({
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        name: profile?.name || null,
      });

      setRole(profile?.role || "client"); // 👈 "client" = default role
    });

    return () => unsub();
  }, []);

  async function logout() {
    await signOut(auth);
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider value={{ user, role, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// client/src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseClient";
import { getMe, syncUserProfile } from "../api";   // ✅ FIXED — REMOVE "api"
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setRole(null);
        setToken(null);
        localStorage.removeItem("token");
        return;
      }

      // Fetch token
      const token = await firebaseUser.getIdToken();
      setToken(token);
      localStorage.setItem("token", token);

      // 🔥 Sync user → backend creates Firestore user doc
      await syncUserProfile();

      // 🔥 Fetch extended user profile afterwards
      const profile = await getMe();

      setUser({
        email: firebaseUser.email,
        uid: firebaseUser.uid,
      });

      setRole(profile.role || "client");
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

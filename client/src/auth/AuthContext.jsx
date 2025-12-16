// client/src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseClient";
import api from "../api";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("client");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Синхронизация на потребителя с бекенда (връща role, name, email)
  async function fetchUserProfile() {
    try {
      const res = await api.post("/auth/sync");
      return res.data; // { email, role, name }
    } catch (err) {
      console.error("Неуспешна синхронизация на потребителя:", err);
      return null;
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (!firebaseUser) {
        setUser(null);
        setRole("client");
        setToken(null);
        localStorage.removeItem("token");
        setLoading(false);
        return;
      }

      // 🔥 Firebase ID token
      const token = await firebaseUser.getIdToken();
      setToken(token);
      localStorage.setItem("token", token);

      // 🔥 Взимаме роля и профил от бекенда
      const profile = await fetchUserProfile();

      setUser({
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        name: profile?.name || "",
      });

      setRole(profile?.role || "client");

      setLoading(false);
    });

    return () => unsub();
  }, []);

  async function logout() {
    await signOut(auth);
    setUser(null);
    setRole("client");
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider value={{ user, role, token, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

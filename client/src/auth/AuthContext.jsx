import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseClient";
import { api } from "../api";
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

      const token = await firebaseUser.getIdToken();
      localStorage.setItem("token", token);
      setToken(token);

      // Sync user
      await api.syncUserProfile(token);

      // THEN fetch full profile (including role)
      const profile = await api.getMe();

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
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
    setToken(null);
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

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseClient";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { api } from "../api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest"); // guest | client | admin
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      try {
        setUser(user);

        if (user) {
          const token = await getIdToken(user);
          localStorage.setItem("token", token);

          // sync profile in backend
          await api.syncUserProfile(token);

          // get role from backend
          const me = await api.getMe();
          setRole(me.role || "client");
        } else {
          localStorage.removeItem("token");
          setRole("guest");
        }
      } catch (err) {
        console.error("AuthContext error:", err);
        setRole("guest");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    role,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

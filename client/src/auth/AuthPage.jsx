import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebaseClient";
import api from "../api";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function AuthPage() {
  const nav = useNavigate();

  const [mode, setMode] = useState("login"); // login | register

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        nav("/");
        return;
      }

      // REGISTER
      if (!firstName.trim() || !lastName.trim()) {
        setError("Моля, въведете име и фамилия.");
        setLoading(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Ensure token is available immediately for /auth/sync
      const u = auth.currentUser;
      if (u) {
        const t = await u.getIdToken();
        localStorage.setItem("token", t);

        // ✅ Send profile info to backend (backend may store it in users collection)
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
        try {
          await api.post("/auth/sync", {
            name: fullName,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
          });
        } catch (e) {
          // if backend ignores body, it's fine; still continue
          console.warn("Sync with name failed (non-blocking):", e);
        }
      }

      nav("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Неуспешна автентикация.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontFamily: "system-ui",
      }}
    >
      <h1>{mode === "login" ? "Вход" : "Регистрация"}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
            <label>Име</label>
            <input
              type="text"
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Фамилия</label>
            <input
              type="text"
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label>Имейл</label>
        <input
          type="email"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Парола</label>
        <input
          type="password"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          disabled={loading}
        >
          {loading
            ? "Обработва се..."
            : mode === "login"
            ? "Вход"
            : "Създай профил"}
        </button>
      </form>

      <button
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError("");
          setLoading(false);
        }}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          background: "#eee",
        }}
      >
        {mode === "login" ? "Към регистрация" : "Към вход"}
      </button>

      <button
        onClick={() => nav("/")}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        Назад към магазина
      </button>
    </div>
  );
}

// client/src/auth/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebaseClient";
import api from "../api";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
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
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      const fn = firstName.trim();
      const ln = lastName.trim();
      const fullName = [fn, ln].filter(Boolean).join(" ").trim();

      // Optional: save displayName in Firebase Auth user profile
      if (fullName) {
        await updateProfile(cred.user, { displayName: fullName });
      }

      // IMPORTANT: call /auth/sync with token + body so Firestore gets names
      const token = await cred.user.getIdToken();

      await api.post(
        "/auth/sync",
        {
          firstName: fn,
          lastName: ln,
          name: fullName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear fields (optional)
      setFirstName("");
      setLastName("");

      nav("/");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Неуспешна автентикация.");
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
        borderRadius: "10px",
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ marginTop: 0 }}>{mode === "login" ? "Вход" : "Регистрация"}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
            <label>Име</label>
            <input
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />

            <label>Фамилия</label>
            <input
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </>
        )}

        <label>Имейл</label>
        <input
          type="email"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <label>Парола</label>
        <input
          type="password"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          disabled={loading}
        >
          {loading ? "Обработва се..." : mode === "login" ? "Вход" : "Създай профил"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          background: "#eee",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {mode === "login" ? "Към регистрация" : "Към вход"}
      </button>

      <button
        onClick={() => nav("/")}
        style={{ width: "100%", marginTop: "10px", padding: "10px", cursor: "pointer" }}
        disabled={loading}
      >
        Назад към сайта
      </button>
    </div>
  );
}

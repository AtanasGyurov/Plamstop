// client/src/auth/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebaseClient";
import api from "../api";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function AuthPage() {
  const nav = useNavigate();

  const [mode, setMode] = useState("login"); // login | register
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function friendlyError(err) {
    const code = err?.code || "";

    switch (code) {
      case "auth/invalid-email":
        return "Невалиден имейл адрес.";
      case "auth/user-not-found":
        return "Няма потребител с този имейл.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Грешен имейл или парола.";
      case "auth/email-already-in-use":
        return "Вече има профил с този имейл.";
      case "auth/weak-password":
        return "Паролата трябва да е поне 6 символа.";
      case "auth/missing-email":
        return "Въведете имейл адрес.";
      case "auth/too-many-requests":
        return "Твърде много опити. Опитайте по-късно.";
      default:
        return err?.message || "Възникна грешка.";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        nav("/");
        return;
      }

      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const fn = firstName.trim();
      const ln = lastName.trim();
      const fullName = [fn, ln].filter(Boolean).join(" ").trim();

      if (fullName) {
        await updateProfile(cred.user, { displayName: fullName });
      }

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

      setFirstName("");
      setLastName("");
      nav("/");
    } catch (err) {
      console.error(err);
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setMsg("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Въведете имейла си и натиснете „Забравена парола?“.");
      return;
    }

    try {
      setLoading(true);

      // Bulgarian reset email language, if Firebase template supports it
      auth.languageCode = "bg";

      await sendPasswordResetEmail(auth, cleanEmail);

      setMsg(
        "Изпратихме имейл за възстановяване на паролата. Проверете входящата поща и Spam/Promotions."
      );
    } catch (err) {
      console.error(err);
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  const page = {
    maxWidth: "460px",
    margin: "50px auto",
    padding: "22px",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    fontFamily: "system-ui",
  };

  const label = {
    display: "block",
    marginBottom: 6,
    fontWeight: 800,
  };

  const input = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.25)",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
  };

  const btn = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.92)",
    cursor: "pointer",
    fontWeight: 800,
  };

  const btnAccent = {
    ...btn,
    border: "1px solid rgba(255,122,24,0.35)",
    background: "rgba(255,122,24,0.18)",
  };

  return (
    <div style={page}>
      <h1 style={{ marginTop: 0 }}>
        {mode === "login" ? "Вход" : "Регистрация"}
      </h1>

      {error && (
        <div
          style={{
            color: "#ffb4b4",
            background: "rgba(255,0,0,0.10)",
            border: "1px solid rgba(255,0,0,0.25)",
            borderRadius: 12,
            padding: 10,
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      {msg && (
        <div
          style={{
            color: "#b8ffc8",
            background: "rgba(0,255,80,0.10)",
            border: "1px solid rgba(0,255,80,0.25)",
            borderRadius: 12,
            padding: 10,
            marginBottom: 12,
          }}
        >
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
            <label style={label}>Име</label>
            <input
              style={input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />

            <label style={label}>Фамилия</label>
            <input
              style={input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </>
        )}

        <label style={label}>Имейл</label>
        <input
          type="email"
          style={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="example@email.com"
        />

        <label style={label}>Парола</label>
        <input
          type="password"
          style={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          placeholder={mode === "login" ? "Вашата парола" : "Минимум 6 символа"}
        />

        {mode === "login" && (
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={loading}
            style={{
              border: "none",
              background: "transparent",
              color: "rgba(255,122,24,0.95)",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 800,
              padding: 0,
              marginBottom: 8,
            }}
          >
            Забравена парола?
          </button>
        )}

        <button type="submit" style={btnAccent} disabled={loading}>
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
          setMsg("");
        }}
        style={btn}
        disabled={loading}
      >
        {mode === "login" ? "Към регистрация" : "Към вход"}
      </button>

      <button onClick={() => nav("/")} style={btn} disabled={loading}>
        Назад към сайта
      </button>
    </div>
  );
}
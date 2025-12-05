import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebaseClient";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";


export default function AuthPage() {
  const nav = useNavigate();

  const [mode, setMode] = useState("login"); // login | register
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
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      // go back to shop
      nav("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Authentication failed.");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontFamily: "system-ui",
      }}
    >
      <h1>{mode === "login" ? "Log In" : "Register"}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
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
            ? "Processing..."
            : mode === "login"
            ? "Log In"
            : "Create Account"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          background: "#eee",
        }}
      >
        Switch to {mode === "login" ? "Register" : "Log In"}
      </button>

      <button
        onClick={() => nav("/")}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        Back to Shop
      </button>
    </div>
  );
}

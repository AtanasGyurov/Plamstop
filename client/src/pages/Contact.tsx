import { useState, FormEvent } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <section className="card">
      <h2 style={{ marginTop: 0 }}>Contact</h2>

      {!sent ? (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <input
            required
            placeholder="Your email"
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.15)",
              background: "transparent",
              color: "var(--text)",
            }}
          />
          <textarea
            required
            rows={4}
            placeholder="Message"
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.15)",
              background: "transparent",
              color: "var(--text)",
            }}
          />
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
      ) : (
        <p style={{ color: "var(--muted)" }}>Thanks! We’ll get back to you.</p>
      )}
    </section>
  );
}

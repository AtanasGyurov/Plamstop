import { useMemo, useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../auth/AuthContext"; // ✅ add

export default function Contacts() {
  const { user } = useAuth(); // ✅ add

  const ADDRESS_LINE_1 = "Мараша, Район Централен, ул. „Тодор Икономов“ 4";
  const ADDRESS_LINE_2 = "4002 Пловдив";

  // Google Maps embed (search by address)
  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(
      `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}, Bulgaria`
    );
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || ""); // ✅ prefill
  const [subject, setSubject] = useState("Запитване от сайта");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // ✅ keep email prefilled if user changes (login/logout) while on the page
  useEffect(() => {
    setEmail((prev) => {
      // If email is empty OR it equals the previous user's email, update it.
      // This keeps manual edits intact (doesn't overwrite what the user typed).
      if (!prev.trim()) return user?.email || "";
      return prev;
    });
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    setOkMsg("");
    setErrMsg("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrMsg("Моля, попълнете Име, Имейл и Съобщение.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/contact", {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || "Запитване от сайта",
        message: message.trim(),
      });

      setOkMsg("Изпратено! Ще се свържем с вас възможно най-скоро.");
      setName("");
      // ✅ keep email (like cart). If user is logged in, keep their email:
      setEmail((user?.email || email).trim());
      setSubject("Запитване от сайта");
      setMessage("");
    } catch (err) {
      console.error(err);
      setErrMsg("Грешка при изпращане. Опитайте отново след малко.");
    } finally {
      setLoading(false);
    }
  }

  // Dark inputs without global CSS changes
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(10,12,18,0.55)",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
  };

  const labelStyle = { fontWeight: 800, marginTop: 10, display: "block" };

  return (
    <div className="container">
      <h1 style={{ marginBottom: 6 }}>Контакти</h1>
      <p className="muted" style={{ marginTop: 0 }}>
        Свържи се с нас за оферта, консултация или допълнителна информация.
      </p>

      {/* Two-column responsive layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "grid", gap: 18 }}>
          {/* Address card */}
          <section
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                padding: 14,
                fontWeight: 900,
                borderBottom: "1px solid rgba(255,255,255,0.10)",
                background:
                  "linear-gradient(135deg, rgba(255,122,24,0.18), rgba(211,47,47,0.18))",
              }}
            >
              Адрес
            </div>

            <div style={{ padding: 14, lineHeight: 1.5 }}>
              <div style={{ fontWeight: 900 }}>{ADDRESS_LINE_1}</div>
              <div>{ADDRESS_LINE_2}</div>

              <div style={{ height: 10 }} />

              <div>
                <strong>Телефон: 0888447383</strong>{" "}
              </div>
              <div>
                <strong>Имейл: plamstop.contact@gmail.com</strong>{" "}
              </div>
            </div>
          </section>

          {/* Form card */}
          <section
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                padding: 14,
                fontWeight: 900,
                borderBottom: "1px solid rgba(255,255,255,0.10)",
                background:
                  "linear-gradient(135deg, rgba(255,122,24,0.18), rgba(211,47,47,0.18))",
              }}
            >
              Запитване (имейл)
            </div>

            <div style={{ padding: 14 }}>
              {okMsg && (
                <div
                  style={{
                    border: "1px solid rgba(80,200,120,0.35)",
                    background: "rgba(80,200,120,0.12)",
                    padding: 10,
                    borderRadius: 12,
                    marginBottom: 10,
                  }}
                >
                  {okMsg}
                </div>
              )}

              {errMsg && (
                <div
                  style={{
                    border: "1px solid rgba(211,47,47,0.45)",
                    background: "rgba(211,47,47,0.12)",
                    padding: 10,
                    borderRadius: 12,
                    marginBottom: 10,
                  }}
                >
                  {errMsg}
                </div>
              )}

              <form onSubmit={onSubmit}>
                <label style={labelStyle}>Име</label>
                <input
                  style={inputStyle}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Вашето име"
                />

                <label style={labelStyle}>Имейл за обратна връзка</label>
                <input
                  type="email" // ✅ small improvement
                  style={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // ✅ still editable
                  placeholder="example@email.com"
                />

                <label style={labelStyle}>Тема</label>
                <input
                  style={inputStyle}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Тема"
                />

                <label style={labelStyle}>Съобщение</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напишете кратко запитване…"
                />

                <button
                  type="submit"
                  className="navBtn accent"
                  disabled={loading}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: 12,
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Изпращане…" : "Изпрати"}
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* RIGHT: Map */}
        <section
          style={{
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 16,
            overflow: "hidden",
            background: "rgba(255,255,255,0.06)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              padding: 14,
              fontWeight: 900,
              borderBottom: "1px solid rgba(255,255,255,0.10)",
              background:
                "linear-gradient(135deg, rgba(255,122,24,0.18), rgba(211,47,47,0.18))",
            }}
          >
            Карта
          </div>

          <div style={{ height: 420 }}>
            <iframe
              title="Plamstop Map"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>

      {/* Responsive fallback */}
      <style>{`
        @media (max-width: 920px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

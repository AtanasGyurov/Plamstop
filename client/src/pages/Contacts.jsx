import { useMemo, useState } from "react";

export default function Contacts() {
  const addressLine1 = "Мараша, Район Централен, ул. „Тодор Икономов“ 4";
  const addressLine2 = "4002 Пловдив";
  const fullAddress =
    "Мараша Район Централен, ул. „Тодор Икономов“ 4, 4002 Пловдив";

  // (Засега е само UI форма – без реално изпращане, както каза)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const mapSrc = useMemo(() => {
    // Google Maps embed по адрес (без API key)
    const q = encodeURIComponent(fullAddress);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [fullAddress]);

  function handleSubmit(e) {
    e.preventDefault();
    // Засега само UI (по-късно ще вържем имейл изпращане)
    alert("Формата е подготвена. Следващата стъпка е реално изпращане на имейл.");
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="pageTitle">Контакти</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Свържи се с нас за оферта, консултация или допълнителна информация.
        </p>

        {/* ✅ 2-column layout: left info+form, right map */}
        <div
          style={{
            marginTop: 18,
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
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                overflow: "hidden",
                background: "rgba(255,255,255,0.06)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                  background:
                    "linear-gradient(135deg, rgba(255,122,24,0.16), rgba(211,47,47,0.16))",
                  fontWeight: 900,
                }}
              >
                Адрес
              </div>

              <div style={{ padding: 14, display: "grid", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>{addressLine1}</div>
                <div className="muted">{addressLine2}</div>

                <div style={{ marginTop: 6, display: "grid", gap: 6 }}>
                  <div>
                    <strong>Телефон:</strong>{" "}
                    <span className="muted">(по избор)</span>
                  </div>
                  <div>
                    <strong>Имейл:</strong>{" "}
                    <span className="muted">(по избор)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Form card (under info) */}
            <section
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                overflow: "hidden",
                background: "rgba(255,255,255,0.06)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                  background:
                    "linear-gradient(135deg, rgba(255,122,24,0.16), rgba(211,47,47,0.16))",
                  fontWeight: 900,
                }}
              >
                Запитване
              </div>

              <form
                onSubmit={handleSubmit}
                style={{ padding: 14, display: "grid", gap: 10 }}
              >
                <label style={{ fontWeight: 800 }}>Име</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Вашето име"
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                />

                <label style={{ fontWeight: 800 }}>Имейл</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                />

                <label style={{ fontWeight: 800 }}>Тема</label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Напр. оферта, консултация, продукт..."
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                />

                <label style={{ fontWeight: 800 }}>Съобщение</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Опиши от какво имаш нужда…"
                  rows={5}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.92)",
                    resize: "vertical",
                  }}
                />

                <button
                  type="submit"
                  style={{
                    marginTop: 6,
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,122,24,0.35)",
                    background: "rgba(255,122,24,0.18)",
                    color: "rgba(255,255,255,0.95)",
                    cursor: "pointer",
                    fontWeight: 900,
                  }}
                >
                  Изпрати запитване
                </button>

                <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                  * Изпращането ще го вържем по-късно (backend/email service).
                </div>
              </form>
            </section>
          </div>

          {/* RIGHT */}
          <section
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                padding: "12px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
                background:
                  "linear-gradient(135deg, rgba(255,122,24,0.16), rgba(211,47,47,0.16))",
                fontWeight: 900,
              }}
            >
              Карта
            </div>

            <div style={{ padding: 12 }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(0,0,0,0.25)",
                }}
              >
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

              <div className="muted" style={{ fontSize: 12, marginTop: 10 }}>
                Ако картата не се зарежда, отвори адреса директно в Google Maps.
              </div>
            </div>
          </section>
        </div>

        {/* ✅ small responsive tweak without CSS file */}
        <div
          style={{
            height: 1,
            opacity: 0,
          }}
        />
      </div>

      {/* Responsive: stack on small screens */}
      <style>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

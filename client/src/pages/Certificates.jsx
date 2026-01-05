export default function Certificates() {
  return (
    <div className="container">
      <h1 className="pageTitle">Сертификати</h1>
      <p className="muted">
        Тук ще покажем сертификати, протоколи и документи за съответствие.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
          marginTop: 18,
        }}
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <article
            key={idx}
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
                height: 140,
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                opacity: 0.9,
                background:
                  "linear-gradient(135deg, rgba(255,122,24,0.22), rgba(211,47,47,0.18))",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Място за сертификат #{idx + 1}
            </div>

            <div style={{ padding: 14 }}>
              <div style={{ fontWeight: 900 }}>Сертификат / Документ</div>
              <div className="muted" style={{ marginTop: 6 }}>
                Кратко описание – тип, дата, стандарт (пример: EN / ISO).
              </div>

              <button
                type="button"
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.92)",
                  cursor: "pointer",
                  fontWeight: 900,
                }}
              >
                Виж детайли
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

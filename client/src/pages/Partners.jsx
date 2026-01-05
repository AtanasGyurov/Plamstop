export default function Partners() {
  return (
    <div className="container">
      <h1 className="pageTitle">Партньори и марки</h1>
      <p className="muted">
        Тук ще добавим лога и кратко описание на партньори/доставчици/марки.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
          marginTop: 18,
        }}
      >
        {Array.from({ length: 8 }).map((_, idx) => (
          <article
            key={idx}
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              padding: 14,
              display: "grid",
              gap: 10,
            }}
          >
            <div
              style={{
                height: 90,
                borderRadius: 14,
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,122,24,0.14))",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Лого #{idx + 1}
            </div>

            <div style={{ fontWeight: 900 }}>Партньор / Марка</div>
            <div className="muted">
              1–2 изречения за марката (какво доставя/какво покрива).
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

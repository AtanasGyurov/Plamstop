import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <div className="container">

        {/* HERO */}
        <section
          style={{
            display: "grid",
            gap: 22,
            padding: "28px 0 42px",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 18,
              padding: 26,
              background: "rgba(255,255,255,0.05)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ maxWidth: 760 }}>
              <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900 }}>
                Plamstop 🔥
              </h1>

              <p className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
                Добре дошли в Plamstop — компания за пожарна безопасност с
                интегриран онлайн магазин. Предлагаме оборудване, консултации и
                решения за защита на домове, офиси и индустриални обекти.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                <Link to="/shop" className="navBtn accent">
                  Към магазина
                </Link>
                <Link to="/about" className="navBtn">
                  За нас
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK SUMMARY */}
        <section
          style={{
            margin: "10px 0 34px",
            display: "grid",
            gap: 18,
          }}
        >
          <h2 style={{ margin: 0 }}>Накратко за Plamstop</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {[
              {
                title: "Опит и експертиза",
                text:
                  "Работим с реални решения за пожарна безопасност — от оценка на риска до внедряване.",
              },
              {
                title: "Онлайн магазин",
                text:
                  "Подбрани продукти, ясни цени и бърза поръчка директно онлайн.",
              },
              {
                title: "Сигурност",
                text:
                  "Поръчките и административният достъп са защитени чрез Firebase вход и роли.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 16,
                  padding: 18,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <strong>{item.title}</strong>
                <p className="muted" style={{ marginTop: 8, lineHeight: 1.5 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES / IMAGE PLACEHOLDERS */}
        <section style={{ marginBottom: 40 }}>
          <h2>Какво предлагаме</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              marginTop: 16,
            }}
          >
            {[
              "Място за основна снимка / банер",
              "Място за услуги",
              "Място за онлайн магазина",
            ].map((label) => (
              <div
                key={label}
                style={{
                  height: 160,
                  borderRadius: 18,
                  border: "1px dashed rgba(255,255,255,0.25)",
                  background:
                    "linear-gradient(135deg, rgba(255,122,24,0.15), rgba(211,47,47,0.15))",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 26,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              padding: 20,
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>Готови ли сте да поръчате?</strong>
              <div className="muted">
                Разгледайте продуктите и добавете в количката — отнема минута.
              </div>
            </div>

            <Link to="/shop" className="navBtn accent">
              Отвори магазина →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

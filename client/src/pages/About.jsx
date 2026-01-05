// client/src/pages/About.jsx
import { Link } from "react-router-dom";

export default function About() {
  const card = {
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 16,
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.20)",
    padding: 16,
  };

  const media = {
    height: 180,
    borderRadius: 14,
    border: "1px dashed rgba(255,255,255,0.18)",
    background:
      "linear-gradient(135deg, rgba(255,122,24,0.14), rgba(211,47,47,0.14))",
    display: "grid",
    placeItems: "center",
    color: "rgba(255,255,255,0.70)",
    fontWeight: 900,
  };

  const btn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.92)",
    textDecoration: "none",
    fontWeight: 800,
  };

  const btnAccent = {
    ...btn,
    border: "1px solid rgba(255,122,24,0.35)",
    background: "rgba(255,122,24,0.18)",
  };

  return (
    <div className="container">
      <h1 className="pageTitle">За Plamstop</h1>
      <p className="muted" style={{ lineHeight: 1.6, marginTop: 8 }}>
        Plamstop е компания за <strong>пожарна безопасност</strong> с фокус върху
        надеждни решения за домове, офиси, складове и индустриални обекти.
        Комбинираме <strong>консултация</strong>, <strong>доставка</strong> и
        <strong>поддръжка</strong>, а чрез онлайн магазина улесняваме избора на
        продукти за реални нужди.
      </p>

      {/* Top CTA */}
      <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link to="/shop" style={btnAccent}>Към магазина</Link>
        <Link to="/contacts" style={btn}>Контакти</Link>
        <Link to="/certificates" style={btn}>Сертификати</Link>
        <Link to="/partners" style={btn}>Партньори и марки</Link>
      </div>

      {/* Grid */}
      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        {/* Mission */}
        <div style={card}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>Какво правим</div>
          <ul style={{ marginTop: 10, marginBottom: 0, lineHeight: 1.7 }}>
            <li>Пожарогасители, табели, обозначения и аксесоари</li>
            <li>Оборудване и решения за пожарна безопасност</li>
            <li>Поръчки онлайн + бърза комуникация за оферти</li>
            <li>Съдействие при избор според обект и риск</li>
          </ul>
        </div>

        {/* Photo placeholder */}
        <div style={card}>
          <div style={media}>Снимка: екип / обект / монтаж</div>
          <div className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
            Тук ще добавим реални снимки от обекти, склад/магазин или процес на работа.
          </div>
        </div>

        {/* Why us */}
        <div style={card}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>Защо да изберете нас</div>
          <div className="muted" style={{ marginTop: 10, lineHeight: 1.7 }}>
            Работим с ясна цел: <strong>по-малко риск</strong> и{" "}
            <strong>по-голяма сигурност</strong>.
            Поддържаме подреден каталог, прозрачни цени и удобен процес за поръчка.
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <div style={{ ...card, padding: 12, background: "rgba(255,255,255,0.05)" }}>
              <strong>Бърз избор</strong> — категории и ясна информация.
            </div>
            <div style={{ ...card, padding: 12, background: "rgba(255,255,255,0.05)" }}>
              <strong>Подход за реални нужди</strong> — не “каквото и да е”, а правилното.
            </div>
          </div>
        </div>

        {/* Second placeholder */}
        <div style={card}>
          <div style={media}>Снимка: продукти / витрина / логистика</div>
          <div className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
            Място за визуални блокове — ще ги заменим със снимки/банери по-късно.
          </div>
        </div>
      </div>

      {/* Bottom links */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>Още информация</div>
        <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
          Ако ви трябват документи, декларации и сертификати — вижте{" "}
          <Link to="/certificates" style={{ color: "rgba(255,255,255,0.92)" }}>
            страницата със сертификати
          </Link>
          . За брандове и партньори —{" "}
          <Link to="/partners" style={{ color: "rgba(255,255,255,0.92)" }}>
            партньори и марки
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

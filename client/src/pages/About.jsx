export default function About() {
  return (
    <div className="container">
      {/* HERO / INTRO */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 24,
          padding: 28,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <div>
          <h1 className="pageTitle">За Plamstop 🔥</h1>
          <p className="muted" style={{ maxWidth: 760, lineHeight: 1.7 }}>
            Plamstop е българска компания, специализирана в решения за пожарна
            безопасност за домове, офиси, търговски и индустриални обекти.
            Съчетаваме реален практически опит с модерен онлайн магазин,
            улесняващ избора и поръчката на оборудване.
          </p>
        </div>

        {/* IMAGE PLACEHOLDER */}
        <div
          style={{
            borderRadius: 18,
            border: "1px dashed rgba(255,255,255,0.25)",
            background:
              "linear-gradient(135deg, rgba(255,122,24,0.15), rgba(211,47,47,0.15))",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            opacity: 0.85,
          }}
        >
          Място за основна снимка / екип
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section style={{ marginTop: 28 }}>
        <h2 style={{ marginBottom: 14 }}>С какво сме различни</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <InfoCard
            title="Реална експертиза"
            text="Работим с реални обекти и реални изисквания — не само продажба, а цялостна пожарна защита."
          />
          <InfoCard
            title="Ясни продукти"
            text="В магазина ни ще намерите подбрано оборудване с ясни цени, наличности и предназначение."
          />
          <InfoCard
            title="Локално обслужване"
            text="Базирани сме в Пловдив и работим активно на територията на България."
          />
        </div>
      </section>

      {/* SERVICES + IMAGE */}
      <section
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          padding: 24,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <div>
          <h2>Какво предлагаме</h2>
          <p className="muted" style={{ lineHeight: 1.7 }}>
            Plamstop покрива целия процес по пожарна безопасност — от първоначална
            консултация до доставка и внедряване.
          </p>

          <ul style={{ marginTop: 14, lineHeight: 1.9 }}>
            <li>Пожарогасители, датчици и аварийни комплекти</li>
            <li>Оценка на пожарния риск</li>
            <li>Консултации и планове за евакуация</li>
            <li>Доставка, монтаж и поддръжка</li>
          </ul>
        </div>

        {/* IMAGE PLACEHOLDER */}
        <div
          style={{
            borderRadius: 18,
            border: "1px dashed rgba(255,255,255,0.25)",
            background:
              "linear-gradient(135deg, rgba(255,122,24,0.18), rgba(211,47,47,0.18))",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
          }}
        >
          Място за снимка (оборудване / обект)
        </div>
      </section>

      {/* SECURITY + PLATFORM */}
      <section
        style={{
          marginTop: 28,
          padding: 24,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <h2>Онлайн платформа и сигурност</h2>
        <p className="muted" style={{ lineHeight: 1.7, maxWidth: 900 }}>
          Онлайн магазинът на Plamstop е изграден с фокус върху сигурност и
          контрол. Поръчките и административните функции са защитени чрез
          Firebase вход и потребителски роли, което гарантира надеждност и
          проследимост.
        </p>
      </section>

      {/* CTA */}
      <section
        style={{
          marginTop: 30,
          padding: 22,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background:
            "linear-gradient(135deg, rgba(255,122,24,0.18), rgba(211,47,47,0.18))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3 style={{ marginBottom: 6 }}>
            Нуждаете се от оборудване или консултация?
          </h3>
          <p className="muted">
            Разгледайте магазина или се свържете с нас за индивидуално решение.
          </p>
        </div>

        <a href="/shop" className="navBtn accent">
          Към магазина →
        </a>
      </section>
    </div>
  );
}

/* ===== Helpers ===== */

function InfoCard({ title, text }) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 6 }}>{title}</div>
      <div className="muted" style={{ lineHeight: 1.6 }}>
        {text}
      </div>
    </div>
  );
}

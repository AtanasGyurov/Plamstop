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

  const softCard = {
    ...card,
    background: "rgba(255,255,255,0.05)",
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
    cursor: "pointer",
  };

  const btnAccent = {
    ...btn,
    border: "1px solid rgba(255,122,24,0.35)",
    background: "rgba(255,122,24,0.18)",
  };

  const sectionTitle = {
    fontWeight: 900,
    fontSize: 18,
    margin: "0 0 10px",
  };

  const muted = {
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.7,
  };

  // Images (place these later in client/public/images/about/)
  const IMAGES = {
  hero: "/images/about/warehouse.jpg",        // hero background
  team: "/images/about/team_picture.jpg",  // team photo
  extinguishers: "/images/about/extinguishers.jpg",
  alarm: "/images/about/alarm-panel.jpg",
  exit: "/images/about/exit-sign.jpg",
  tools: "/images/about/extinguishers.jpg",   // fallback until tools image exists
};

  const values = [
    {
      title: "Сигурност без компромиси",
      text: "Подбираме решения, които реално намаляват риска — не просто „да отметнем изискване“.",
    },
    {
      title: "Яснота и прозрачност",
      text: "Категории, описания и цени — подредени така, че да изберете бързо и уверено.",
    },
    {
      title: "Фокус върху обекта",
      text: "Различни обекти = различни нужди. Помагаме да изберете правилното спрямо риск и среда.",
    },
    {
      title: "Поддръжка и съдействие",
      text: "При въпроси за избор, количества и документация — комуникацията е бърза и конкретна.",
    },
  ];

  const offerings = [
    "Преносими пожарогасители и аксесоари",
    "Пожароизвестяване — панели, модули, сирени (категорийно подредено)",
    "Аварийно осветление и обозначения",
    "Евакуационни табели и фотолуминесцентни решения",
    "Хидранти, маркучи и принадлежности",
    "Инструменти за инспекция и поддръжка",
    "Евакуационни планове и визуализации (A4/A3/A2 и др.)",
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Избор на продукти",
      text: "Изберете категория и добавете нужните артикули в количката.",
    },
    {
      step: "2",
      title: "Данни за доставка",
      text: "Попълнете име, имейл, адрес и бележка (ако има).",
    },
    {
      step: "3",
      title: "Поръчка / плащане (демо)",
      text: "За showcase използвате Stripe test checkout или стандартна поръчка.",
    },
  ];

  const gallery = [
    { src: IMAGES.extinguishers, title: "Пожарогасители (продуктова визия)" },
    { src: IMAGES.alarm, title: "Пожароизвестяване (панел/система)" },
    { src: IMAGES.exit, title: "Евакуационни табели (обозначение)" },
    { src: IMAGES.tools, title: "Инструменти за инспекция" },
    { src: IMAGES.team, title: "Екип и организация" },
  ];

  function ImgBlock({ src, alt, height = 220 }) {
    return (
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(0,0,0,0.25)",
          height,
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            // fallback gradient if image missing
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.style.background =
              "linear-gradient(135deg, rgba(255,122,24,0.18), rgba(211,47,47,0.14))";
          }}
        />
      </div>
    );
  }

  return (
    <div className="container">
      {/* HERO */}
      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.05)",
          boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ position: "relative" }}>
          {/* background image */}
          <div style={{ height: 240, position: "relative" }}>
            <img
              src={IMAGES.hero}
              alt="Plamstop — пожарна безопасност"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.style.background =
                  "linear-gradient(135deg, rgba(255,122,24,0.22), rgba(211,47,47,0.18))";
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.85) 100%)",
              }}
            />
          </div>

          <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 950 }}>
                За <span style={{ color: "rgba(255,255,255,0.96)" }}>Plamstop</span>
              </h1>
              <img
                src="/images/logo.png"
                alt="Plamstop logo"
                style={{
                  width: 34,
                  height: 34,
                  objectFit: "contain",
                  filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.45))",
                }}
              />
            </div>

            <p style={{ ...muted, marginTop: 8, marginBottom: 0, maxWidth: 820 }}>
              Plamstop е проект и магазин за <strong>пожарна безопасност</strong> с фокус върху
              подредени категории, ясни описания и практични решения за{" "}
              <strong>домове, офиси, складове и индустриални обекти</strong>.
            </p>

            {/* CTA */}
            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/shop" style={btnAccent}>Към магазина</Link>
              <Link to="/contacts" style={btn}>Контакти</Link>
              <Link to="/certificates" style={btn}>Сертификати</Link>
              <Link to="/partners" style={btn}>Партньори и марки</Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Intro + Stats */}
      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <div style={card}>
          <div style={sectionTitle}>Нашата мисия</div>
          <p style={{ ...muted, margin: 0 }}>
            Да направим избора на продукти за пожарна безопасност{" "}
            <strong>по-лесен, по-ясен и по-надежден</strong>.
            Поставяме акцент върху реалните нужди на обекта — тип риск, среда и
            практична употреба.
          </p>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <div style={{ ...softCard, padding: 12 }}>
              <strong>Практичност</strong>
              <div style={{ ...muted, marginTop: 4 }}>
                Избираме артикули, които имат смисъл в реална ситуация.
              </div>
            </div>
            <div style={{ ...softCard, padding: 12 }}>
              <strong>Подреден каталог</strong>
              <div style={{ ...muted, marginTop: 4 }}>
                Категории и филтри, за да стигнете до правилния продукт бързо.
              </div>
            </div>
          </div>
        </div>

        <div style={card}>
          <div style={sectionTitle}>Какво предлагаме</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.75 }}>
            {offerings.map((x) => (
              <li key={x} style={{ color: "rgba(255,255,255,0.86)" }}>
                {x}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 12, ...muted }}>
            Ако търсите документи/декларации — вижте{" "}
            <Link to="/certificates" style={{ color: "rgba(255,255,255,0.92)" }}>
              Сертификати
            </Link>
            .
          </div>
        </div>

        <div style={card}>
          <div style={sectionTitle}>Ценности</div>
          <div style={{ display: "grid", gap: 10 }}>
            {values.map((v) => (
              <div key={v.title} style={{ ...softCard, padding: 12 }}>
                <div style={{ fontWeight: 900 }}>{v.title}</div>
                <div style={{ ...muted, marginTop: 4 }}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: How it works */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={sectionTitle}>Как работи (в магазина)</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
            marginTop: 10,
          }}
        >
          {howItWorks.map((s) => (
            <div key={s.step} style={{ ...softCard, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 950,
                    border: "1px solid rgba(255,122,24,0.35)",
                    background: "rgba(255,122,24,0.14)",
                  }}
                >
                  {s.step}
                </div>
                <div style={{ fontWeight: 900 }}>{s.title}</div>
              </div>
              <div style={{ ...muted, marginTop: 8 }}>{s.text}</div>
            </div>
          ))}
        </div>

        <div style={{ ...muted, marginTop: 12 }}>
          * Плащането със Stripe е в тестов режим за демонстрация (showcase).
        </div>
      </div>

      {/* SECTION: Visual blocks */}
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <div style={card}>
          <div style={sectionTitle}>Екип и подход</div>
          <div style={{ ...muted, marginBottom: 12 }}>
            Работим със структуриран процес: уточняване на нуждите, избор на категории,
            подбор на продукти и при необходимост — съдействие при документация.
          </div>
          <ImgBlock src={IMAGES.team} alt="Екип Plamstop" height={220} />
        </div>

        <div style={card}>
          <div style={sectionTitle}>Качество и доверие</div>
          <div style={{ ...muted, marginBottom: 12 }}>
            Поддържаме страници за сертификати и партньори, за да е ясно какво предлагаме
            и с какви брандове работим.
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/certificates" style={btnAccent}>Сертификати</Link>
            <Link to="/partners" style={btn}>Партньори</Link>
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <div style={{ ...softCard, padding: 12 }}>
              <strong>Категории</strong>
              <div style={{ ...muted, marginTop: 4 }}>
                Пожарогасители, табели, пожарни системи, осветление, инструменти.
              </div>
            </div>
            <div style={{ ...softCard, padding: 12 }}>
              <strong>Удобство</strong>
              <div style={{ ...muted, marginTop: 4 }}>
                Онлайн поръчка + ясни полета (име, имейл, адрес, бележка).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div style={{ marginTop: 16 }}>
        <div style={{ ...sectionTitle, marginBottom: 10 }}>Галерия</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 12,
          }}
        >
          {gallery.map((g) => (
            <div key={g.title} style={card}>
              <ImgBlock src={g.src} alt={g.title} height={170} />
              <div style={{ marginTop: 10, fontWeight: 900 }}>{g.title}</div>
              <div style={{ ...muted, marginTop: 4 }}>
                (Изображение за showcase — може да се замени с реални снимки по-късно.)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={sectionTitle}>Готови ли сте да изберете продукти?</div>
        <div style={muted}>
          Отидете в магазина, изберете категория и добавете нужните артикули в количката.
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/shop" style={btnAccent}>Към магазина</Link>
          <Link to="/contacts" style={btn}>Свържете се с нас</Link>
        </div>
      </div>
    </div>
  );
}

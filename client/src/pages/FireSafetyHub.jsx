// client/src/pages/FireSafetyHub.jsx
import { Link } from "react-router-dom";

export default function FireSafetyHub() {
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

  const sectionTitle = {
    fontWeight: 950,
    fontSize: 20,
    margin: "0 0 10px",
  };

  const muted = {
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.7,
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

  // Place files in: client/public/images/fire-safety/
  const IMAGES = {
    hero: "/images/fire-safety/fire-hero.jpg",

    // diagrams / visuals
    evacuationPlan: "/images/fire-safety/evacuation-plan.jpg",
    signage: "/images/fire-safety/exit-route.jpg",
    pass: "/images/fire-safety/using-extinguisher.jpg",

    // prevention / detection
    smokeLow: "/images/fire-safety/smoke-detector.jpg",

    // equipment / readiness
    electrical: "/images/fire-safety/fire-equipment.jpg",
    kitchen: "/images/fire-safety/fire-equipment.jpg",

    // assembly
    assemblyPoint: "/images/fire-safety/assembly-point.jpg",
  };

  function ExtLink({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ color: "rgba(255,255,255,0.92)", textDecoration: "none" }}
      >
        {children}
      </a>
    );
  }

  /**
   * ✅ ImgBlock rules:
   * - fit="cover"  => for photos (always fills the box nicely)
   * - fit="contain"=> for schemes/diagrams (no cropping, but padded)
   * - pos controls what part of the photo is kept when using cover
   */
  function ImgBlock({ src, alt, height = 190 }) {
  return (
    <div
      style={{
        height,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.32)",
        display: "grid",
        placeItems: "center",
        padding: 14,                 // ✅ always padding
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",          // ✅ never overflow
          maxHeight: "100%",         // ✅ never overflow
          width: "auto",             // ✅ keep natural ratio
          height: "auto",            // ✅ keep natural ratio
          objectFit: "contain",      // ✅ NEVER CROP (fixes your screenshot)
          display: "block",
          filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))",
          borderRadius: 12,
        }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.style.background =
            "linear-gradient(135deg, rgba(255,122,24,0.18), rgba(211,47,47,0.14))";
        }}
      />
    </div>
  );
}


  const sources = [
    {
      title: "Правила за поведение при пожар (ГДПБЗН/МВР)",
      href: "https://mvr.bg/gdpbzn/info-center/pravila-povedenie/pri-pojar",
    },
    {
      title: "Единен европейски номер 112 (ЕС, BG)",
      href: "https://europa.eu/youreurope/citizens/travel/security-and-emergencies/emergency/index_bg.htm",
    },
    {
      title: "Нормативна уредба (ГДПБЗН/МВР)",
      href: "https://mvr.bg/gdpbzn/%D0%B4%D0%B8%D1%80%D0%B5%D0%BA%D1%86%D0%B8%D1%8F%D1%82%D0%B0/%D0%BD%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B0-%D1%83%D1%80%D0%B5%D0%B4%D0%B1%D0%B0",
    },
  ];

  const quickActions = [
    {
      title: "1) Подай сигнал",
      text: "Обади се на 112. Кажи адрес, какво гори, има ли хора вътре и вход/етаж.",
    },
    {
      title: "2) Евакуирай се безопасно",
      text: "Не използвай асансьор. Ако има дим — движи се ниско и следвай маркировките.",
    },
    {
      title: "3) Затвори врати (ако можеш)",
      text: "Затворената врата ограничава дима и огъня и печели време за евакуация.",
    },
    {
      title: "4) Не рискувай излишно",
      text: "Пожарогасител използвай само ако е безопасно и имаш ясен изход зад теб.",
    },
  ];

  const guides = [
    {
      title: "Дом / Апартамент — основни правила",
      bullets: [
        "Дръж изходите свободни и имай план за евакуация (с 2 маршрута).",
        "При дим: ниско, покрий нос/уста с плат, не отваряй горещи врати.",
        "Не се връщай за вещи.",
        "Ако не можеш да излезеш: изолирай се, запуши процепи с мокри кърпи и звънни на 112.",
      ],
      img: IMAGES.kitchen,
    },
    {
      title: "Офис / Магазин — организация",
      bullets: [
        "Ясни евакуационни маршрути и обозначения на изходите.",
        "Аварийно осветление, табели и инструкции на видимо място.",
        "Определено място за сборен пункт (assembly point).",
        "Пожарогасители на достъпни точки + периодичен контрол.",
      ],
      img: IMAGES.signage,
    },
  ];

  const schemes = [
    {
      title: "Схема: Евакуационен план",
      text:
        "Покажи маршрути (основен и резервен), пожарогасители, ръчни бутони, електрически табла и сборен пункт.",
      img: IMAGES.evacuationPlan,
      fit: "contain", // ✅ do NOT crop plans
    },
    {
      title: "Схема: PASS техника за пожарогасител",
      text:
        "P—Pull (извади щифта), A—Aim (насочи в основата), S—Squeeze (натисни), S—Sweep (мети встрани).",
      img: IMAGES.pass,
      fit: "contain",
    },
    {
      title: "Схема: Движение при задимяване",
      text: "Ниско до пода + кратко дишане през плат. Не бягай изправен през дим.",
      img: IMAGES.smokeLow,
      fit: "cover",
      pos: "center",
    },
    {
      title: "Схема: Електрически пожар",
      text:
        "Изключи захранването, ако е безопасно. Не използвай вода. Ползвай подходящ пожарогасител/прахов.",
      img: IMAGES.electrical,
      fit: "cover",
      pos: "center",
    },
  ];

  const checklist = [
    "Проверка: табели/маркировка и аварийно осветление",
    "Проверка: пожарогасители (наличност, достъпност, пломба/срок)",
    "План за евакуация: видим и актуален",
    "Сборен пункт: определен и известен на хората",
    "Инструктаж: кой звъни на 112 и кой проверява помещенията (ако е безопасно)",
  ];

  const mistakes = [
    { title: "Грешка: асансьор при пожар", text: "При спиране на тока или дим в шахтата рискът е огромен." },
    { title: "Грешка: отваряне на гореща врата", text: "Може да подхраниш огъня с кислород и да получиш пламък/дим в лицето." },
    { title: "Грешка: връщане за вещи", text: "Секунди решават всичко. Евакуацията е приоритет." },
    { title: "Грешка: вода при електрически пожар", text: "Опасност от токов удар. Първо изключи захранването (ако е безопасно)." },
  ];

  const myths = [
    { q: "„Малък пожар — ще го изгасим бързо.“", a: "Ако няма безопасен изход зад теб и огънят расте — излез и звънни на 112." },
    { q: "„Димът е проблем, но огънят е далеч.“", a: "Димът е най-опасен. Действай веднага: ниско, изход, затваряне на врати." },
    { q: "„Ако не виждам пламъци, е безопасно.“", a: "Не. Димът и токсичните газове могат да са смъртоносни." },
  ];

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
          <div style={{ height: 240, position: "relative" }}>
            <img
              src={IMAGES.hero}
              alt="Пожарна безопасност — Plamstop"
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
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 950 }}>Пожарна безопасност</h1>
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

            <p style={{ ...muted, marginTop: 8, marginBottom: 0, maxWidth: 900 }}>
              Статии, ръководства и инструкции за действие при пожар + актуални законови изисквания.
              Добавили сме и места за <strong>схеми/диаграми</strong> (за showcase).
            </p>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/shop" style={btnAccent}>Към магазина</Link>
              <Link to="/contacts" style={btn}>Контакти</Link>
              <Link to="/about" style={btn}>За нас</Link>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={sectionTitle}>Бързи действия при пожар</div>
        <div style={muted}>
          Ако ситуацията е опасна — <strong>първо евакуация и 112</strong>. Не рискувай излишно.
        </div>

        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {quickActions.map((a) => (
            <div key={a.title} style={{ ...softCard, padding: 14 }}>
              <div style={{ fontWeight: 950 }}>{a.title}</div>
              <div style={{ ...muted, marginTop: 6 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* GUIDES */}
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        {guides.map((g) => (
          <div key={g.title} style={card}>
            <div style={sectionTitle}>{g.title}</div>

            {/* ✅ PHOTOS should be cover (no empty areas) */}
            <ImgBlock src={g.img} alt={g.title} height={190} fit="cover" pos="center" />

            <ul style={{ marginTop: 12, marginBottom: 0, paddingLeft: 18, lineHeight: 1.75 }}>
              {g.bullets.map((b) => (
                <li key={b} style={{ color: "rgba(255,255,255,0.86)" }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SCHEMES / DIAGRAMS */}
      <div style={{ marginTop: 16 }}>
        <div style={{ ...sectionTitle, marginBottom: 10 }}>Схеми и диаграми (визуални инструкции)</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {schemes.map((s) => (
            <div key={s.title} style={card}>
              <ImgBlock
                src={s.img}
                alt={s.title}
                height={210}
                fit={s.fit || "cover"}
                pos={s.pos || "center"}
              />

              <div style={{ marginTop: 10, fontWeight: 950 }}>{s.title}</div>
              <div style={{ ...muted, marginTop: 6 }}>{s.text}</div>

              <div style={{ ...muted, marginTop: 10, fontSize: 12 }}>
                * Път: <code style={{ color: "rgba(255,255,255,0.85)" }}>{s.img}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHECKLIST */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={sectionTitle}>Чеклист за готовност (дом/офис)</div>
        <div style={muted}>Мини-списък за бърза проверка и поддръжка.</div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {checklist.map((c) => (
            <div key={c} style={{ ...softCard, padding: 12 }}>
              <span style={{ fontWeight: 950, marginRight: 8 }}>✓</span>
              <span style={{ color: "rgba(255,255,255,0.86)" }}>{c}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/shop" style={btnAccent}>Виж продукти</Link>
          <Link to="/contacts" style={btn}>Попитай за съдействие</Link>
        </div>
      </div>

      {/* MISTAKES + MYTHS */}
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
          <div style={sectionTitle}>Чести грешки</div>
          <div style={{ display: "grid", gap: 10 }}>
            {mistakes.map((m) => (
              <div key={m.title} style={{ ...softCard, padding: 12 }}>
                <div style={{ fontWeight: 950 }}>{m.title}</div>
                <div style={{ ...muted, marginTop: 6 }}>{m.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={card}>
          <div style={sectionTitle}>Митове vs. Факти</div>
          <div style={{ display: "grid", gap: 10 }}>
            {myths.map((x) => (
              <div key={x.q} style={{ ...softCard, padding: 12 }}>
                <div style={{ fontWeight: 950 }}>{x.q}</div>
                <div style={{ ...muted, marginTop: 6 }}>{x.a}</div>
              </div>
            ))}
          </div>

          
        </div>
      </div>

      {/* LEGAL */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={sectionTitle}>Законодателство и източници</div>
        <div style={muted}>
          Линкове към официални ресурси. Можем да добавим и “резюме по точки” за най-честите изисквания.
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {sources.map((s) => (
            <div key={s.title} style={{ ...softCard, padding: 14 }}>
              <div style={{ fontWeight: 950 }}>
                <ExtLink href={s.href}>{s.title}</ExtLink>
              </div>
              <div style={{ ...muted, marginTop: 6 }}>(Официален източник)</div>
            </div>
          ))}
        </div>

        <div style={{ ...muted, marginTop: 12, fontSize: 12 }}>
          * Винаги проверявайте последната редакция в официалните сайтове.
        </div>
      </div>
    </div>
  );
}

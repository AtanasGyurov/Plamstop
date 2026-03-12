// client/src/components/ProductList.jsx
import { useMemo, useState } from "react";

export default function ProductList({
  products = [],
  onAddToCart,
  categoryLabelMap = {},
}) {
  const [openId, setOpenId] = useState(null);

  const openProduct = useMemo(
    () => products.find((p) => p.id === openId) || null,
    [openId, products]
  );

  function prettyCategory(raw) {
    const key = (raw || "").toString().trim();
    return categoryLabelMap[key] || key || "";
  }

  // ✅ Normalize product name so images match even if DB text differs slightly
  function normalizeName(s) {
    return (s || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[“”„"]/g, "„")
      .replace(/[–—]/g, "-")
      .replace(/×/g, "x")
      .replace(/co₂/g, "co2");
  }

  // ✅ Robust mapping: normalized product name -> image path in /public/images/products
  const NAME_TO_IMAGE = useMemo(() => {
    const raw = {
      // Evacuation plans
      "Евакуационен план A2 (печат + ламиниране)":
        "/images/products/evacuation-plan-a2.jpg",
      "Евакуационен план A3 (печат + ламиниране)":
        "/images/products/evacuation-plan-a3.jpg",

      // Extinguishers
      "Прахов пожарогасител 2 кг (ABC)":
        "/images/products/extinguisher-2kg.jpg",
      "Прахов пожарогасител 6 кг (ABC)":
        "/images/products/extinguisher-6kg.jpg",
      "CO₂ пожарогасител 5 кг (B)":
        "/images/products/co2-extinguisher.jpg",
      "CO2 пожарогасител 5 кг (B)":
        "/images/products/co2-extinguisher.jpg",

      // Hoses / nozzle
      "Пожарен маркуч 20 м": "/images/products/fire-hose-20m.jpg",
      "Пожарен струйник (регулируем)":
        "/images/products/fire-nozzle.jpg",

      // Blanket (common variants)
      "Пожарогасително одеяло 1.2x1.8 м":
        "/images/products/fire-blanket.jpg",
      "Пожарогасително одеяло 1.2×1.8 м":
        "/images/products/fire-blanket.jpg",
      "Пожарогасително одеяло 1.2 x 1.8 м":
        "/images/products/fire-blanket.jpg",

      // Alarm button / detectors
      "Ръчен пожароизвестител (бутон) – червен":
        "/images/products/manual-fire-alarm.jpg",
      "Ръчен пожароизвестител (бутон) - червен":
        "/images/products/manual-fire-alarm.jpg",

      "Димен детектор (батерия 9V)":
        "/images/products/smoke-detector.jpg",
      "Топлинен детектор (термичен)":
        "/images/products/heat-detector.jpg",

      // Sirens
      "Сирена вътрешна 24V (звук+светлина)":
        "/images/products/alarm-siren-24v.jpg",
      "Сирена външна 24V (IP рейтинг)":
        "/images/products/outdoor-siren.jpg",

      // Emergency lighting
      "Аварийна лампа LED 6W (3 часа)":
        "/images/products/emergency-lamp-6w.jpg",
      "Аварийна лампа LED 3W (3 часа)":
        "/images/products/emergency-lamp-3w.jpg",

      // Tools
      "Фенер за аварийни проверки (LED)":
        "/images/products/inspection-flashlight.jpg",
      "Манометър/тестер за налягане (преносим)":
        "/images/products/pressure-tester.jpg",

      // Signs
      "Табела „Изход“ (фотолуминесцентна)":
        "/images/products/exit-sign.jpg",
      "Табела „Пожарогасител“ (фотолуминесцентна)":
        "/images/products/extinguisher-sign.jpg",
    };

    const map = {};
    for (const [k, v] of Object.entries(raw)) {
      map[normalizeName(k)] = v;
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ keyword fallback (covers small DB name differences)
  function guessByKeywords(n) {
    // evacuation plans
    if (n.includes("евакуационен") && n.includes("a2"))
      return "/images/products/evacuation-plan-a2.jpg";
    if (n.includes("евакуационен") && n.includes("a3"))
      return "/images/products/evacuation-plan-a3.jpg";

    // extinguishers
    if (n.includes("прахов") && n.includes("2") && n.includes("кг"))
      return "/images/products/extinguisher-2kg.jpg";
    if (n.includes("прахов") && n.includes("6") && n.includes("кг"))
      return "/images/products/extinguisher-6kg.jpg";
    if (n.includes("co2") && n.includes("5") && n.includes("кг"))
      return "/images/products/co2-extinguisher.jpg";

    // hose/nozzle
    if (n.includes("маркуч") && n.includes("20"))
      return "/images/products/fire-hose-20m.jpg";
    if (n.includes("струйник")) return "/images/products/fire-nozzle.jpg";

    // blanket
    if (n.includes("одеяло") || n.includes("blanket"))
      return "/images/products/fire-blanket.jpg";

    // detectors
    if (n.includes("димен") && n.includes("детектор"))
      return "/images/products/smoke-detector.jpg";
    if (n.includes("топлин") && n.includes("детектор"))
      return "/images/products/heat-detector.jpg";

    // manual alarm button
    if (n.includes("ръчен") && (n.includes("пожароизвестител") || n.includes("бутон")))
      return "/images/products/manual-fire-alarm.jpg";

    // sirens
    if (n.includes("сирена") && n.includes("вътреш"))
      return "/images/products/alarm-siren-24v.jpg";
    if (n.includes("сирена") && n.includes("външ"))
      return "/images/products/outdoor-siren.jpg";

    // emergency lamps
    if (n.includes("аварийн") && n.includes("6w"))
      return "/images/products/emergency-lamp-6w.jpg";
    if (n.includes("аварийн") && n.includes("3w"))
      return "/images/products/emergency-lamp-3w.jpg";

    // tools
    if (n.includes("фенер")) return "/images/products/inspection-flashlight.jpg";
    if (n.includes("маномет") || n.includes("тестер"))
      return "/images/products/pressure-tester.jpg";

    // signs
    if (n.includes("табела") && n.includes("изход"))
      return "/images/products/exit-sign.jpg";
    if (n.includes("табела") && n.includes("пожарогасител"))
      return "/images/products/extinguisher-sign.jpg";

    return "";
  }

  function getImg(p) {
    // if DB provides it, use it
    const dbUrl = (p?.imageUrl || "").toString().trim();
    if (dbUrl) return dbUrl;

    const n = normalizeName(p?.name);
    if (NAME_TO_IMAGE[n]) return NAME_TO_IMAGE[n];

    const guessed = guessByKeywords(n);
    if (guessed) return guessed;

    return "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773331523/logo_acsjmi.png";
  }

  // ✅ ONE consistent “square frame” everywhere (like your screenshot)
  const thumbFrameStyle = {
    width: "min(180px, 90%)",
    aspectRatio: "1 / 1",
    borderRadius: 14,
    background: "rgba(255,255,255,0.96)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  };

  const thumbImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain", // ✅ never crop
    display: "block",
    padding: 10, // ✅ keeps it “nice” inside the square frame
  };

  // Card media area (holds the square frame)
  const cardMediaStyle = {
    height: 190,
    borderBottom: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.35)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    padding: 14,
  };

  // Modal media area (holds a larger square frame)
  const modalMediaStyle = {
    maxHeight: "48vh",
    minHeight: 240,
    background: "rgba(0,0,0,0.35)",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    padding: 16,
  };

  const modalFrameStyle = {
    width: "min(420px, 92%)",
    aspectRatio: "1 / 1",
    borderRadius: 16,
    background: "rgba(255,255,255,0.96)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
  };

  const modalImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    padding: 14,
  };

  return (
    <section style={{ marginTop: 18, width: "100%" }}>
      <h2 style={{ margin: "18px 0 14px" }}>Продукти</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {products.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              minHeight: 280,
            }}
          >
            {/* ✅ Card image (square frame like your screenshot) */}
            <div style={cardMediaStyle}>
              <div style={thumbFrameStyle}>
                <img
                  src={getImg(p)}
                  alt={p.name}
                  style={thumbImgStyle}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773331523/logo_acsjmi.png";
                  }}
                />
              </div>
            </div>

            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>
                  {p.name}
                </div>
                <div style={{ fontWeight: 800 }}>
                  {Number(p.price || 0).toFixed(2)} евро
                </div>
              </div>

              {!!p.category && (
                <span
                  style={{
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,122,24,0.35)",
                    background: "rgba(255,122,24,0.12)",
                    width: "fit-content",
                    opacity: 0.95,
                  }}
                >
                  {prettyCategory(p.category)}
                </span>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => setOpenId(p.id)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.92)",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                >
                  Виж детайли
                </button>

                <button
                  type="button"
                  onClick={() => onAddToCart?.(p)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,122,24,0.35)",
                    background: "rgba(255,122,24,0.18)",
                    color: "rgba(255,255,255,0.95)",
                    cursor: "pointer",
                    fontWeight: 900,
                  }}
                >
                  Добави
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ✅ MODAL */}
      {openProduct && (
        <div
          onClick={() => setOpenId(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            padding: 18,
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(920px, 100%)",
              maxHeight: "85vh",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(10,12,18,0.92)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              display: "grid",
              gridTemplateRows: "auto auto 1fr",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 18 }}>
                {openProduct.name}
              </div>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.9)",
                  borderRadius: 10,
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontWeight: 900,
                }}
              >
                ✕
              </button>
            </div>

            {/* ✅ Modal image placeholder (square, fixed, not broken) */}
            <div style={modalMediaStyle}>
              <div style={modalFrameStyle}>
                <img
                  src={getImg(openProduct)}
                  alt={openProduct.name}
                  style={modalImgStyle}
                  onError={(e) => {
                    e.currentTarget.src = "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773331523/logo_acsjmi.png";
                  }}
                />
              </div>
            </div>

            {/* Info (scrolls if long) */}
            <div style={{ padding: 16, overflow: "auto", display: "grid", gap: 10 }}>
              <div style={{ opacity: 0.9 }}>
                <strong>Цена:</strong> {Number(openProduct.price || 0).toFixed(2)} евро
              </div>

              {openProduct.category && (
                <div style={{ opacity: 0.9 }}>
                  <strong>Категория:</strong> {prettyCategory(openProduct.category)}
                </div>
              )}

              <div style={{ opacity: 0.9, lineHeight: 1.5 }}>
                <strong>Описание:</strong>
                <div style={{ marginTop: 6 }}>
                  {openProduct.description?.toString().trim()
                    ? openProduct.description
                    : "Няма описание."}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => onAddToCart?.(openProduct)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,122,24,0.35)",
                    background: "rgba(255,122,24,0.18)",
                    color: "rgba(255,255,255,0.95)",
                    cursor: "pointer",
                    fontWeight: 900,
                  }}
                >
                  Добави в количката
                </button>

                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.92)",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                >
                  Затвори
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
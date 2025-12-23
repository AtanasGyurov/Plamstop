import { useMemo, useState } from "react";

export default function ProductList({ products = [], onAddToCart }) {
  const [openId, setOpenId] = useState(null);

  const openProduct = useMemo(
    () => products.find((p) => p.id === openId) || null,
    [openId, products]
  );

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
              minHeight: 240,
            }}
          >
            <div
              style={{
                height: 120,
                background:
                  "linear-gradient(135deg, rgba(255,122,24,0.25), rgba(211,47,47,0.25))",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
              }}
            />

            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>
                  {p.name}
                </div>
                <div style={{ fontWeight: 800 }}>
                  {Number(p.price || 0).toFixed(2)} лв
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", opacity: 0.9 }}>
                {p.category && (
                  <span
                    style={{
                      fontSize: 12,
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,122,24,0.35)",
                      background: "rgba(255,122,24,0.12)",
                    }}
                  >
                    {p.category}
                  </span>
                )}

                {"stock" in p && (
                  <span style={{ fontSize: 12, opacity: 0.85 }}>
                    наличност: <strong>{p.stock}</strong>
                  </span>
                )}
              </div>

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
              width: "min(860px, 100%)",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(10,12,18,0.92)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 18 }}>{openProduct.name}</div>
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

            <div style={{ padding: 16, display: "grid", gap: 10 }}>
              <div style={{ opacity: 0.9 }}>
                <strong>Цена:</strong> {Number(openProduct.price || 0).toFixed(2)} лв
              </div>

              {openProduct.category && (
                <div style={{ opacity: 0.9 }}>
                  <strong>Категория:</strong> {openProduct.category}
                </div>
              )}

              {"stock" in openProduct && (
                <div style={{ opacity: 0.9 }}>
                  <strong>Наличност:</strong> {openProduct.stock}
                </div>
              )}

              {openProduct.description && (
                <div style={{ opacity: 0.9, lineHeight: 1.5 }}>
                  <strong>Описание:</strong>
                  <div style={{ marginTop: 6 }}>{openProduct.description}</div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
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

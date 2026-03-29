// client/src/pages/Shop.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ProductList from "../components/ProductList";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/AuthContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);

  const { addToCart } = useCart();
  const { user, loading: authLoading } = useAuth();

  const categories = useMemo(
    () => [
      {
        key: "all",
        label: "Всички",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773330074/project-site_nydpjz.jpg",
      },
      {
        key: "extinguishers",
        label: "Преносими пожарогасители",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773329991/extinguishers_bzv8rz.jpg",
      },
      {
        key: "fire-alarm",
        label: "Пожароизвестяване",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773330062/fire-alarm_kvzaqv.jpg",
      },
      {
        key: "alarm-panels",
        label: "Алармени панели и сирени",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773330066/alarm-panels_yddlu4.jpg",
      },
      {
        key: "emergency-lighting",
        label: "Аварийно осветление",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773330069/emergency-lighting_cijsnj.jpg",
      },
      {
        key: "hydrants-hoses",
        label: "Хидранти и маркучи",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773330064/hydrants-hoses_ffe5or.jpg",
      },
      {
        key: "exit-signs",
        label: "Евакуационни табели",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773329989/exit-signs_tsmpct.jpg",
      },
      {
        key: "inspection-tools",
        label: "Инструменти за инспекция",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773330076/inspection-tools_yyx2xg.jpg",
      },
      {
        key: "evacuation-plans",
        label: "Евакуационни планове",
        image:
          "https://res.cloudinary.com/dlcqynjeq/image/upload/v1773330071/evacuation-plans_ez54zo.jpg",
      },
    ],
    []
  );

  const categoryLabelMap = useMemo(() => {
    const map = {};

    for (const c of categories) {
      map[c.key] = c.label;
      map[c.label] = c.label;
    }

    map["firesafety"] = "Преносими пожарогасители";
    map["firealarm"] = "Пожароизвестяване";
    map["alarm_panels"] = "Алармени панели и сирени";
    map["emergencyLighting"] = "Аварийно осветление";
    map["hydrants"] = "Хидранти и маркучи";
    map["evacuationSigns"] = "Евакуационни табели";
    map["inspection"] = "Инструменти за инспекция";
    map["evacuationPlans"] = "Евакуационни планове";

    return map;
  }, [categories]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Неуспешно зареждане на продуктите.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ✅ make sure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = useMemo(() => {
    if (selectedCat === "all") return safeProducts;

    const selected = categories.find((c) => c.key === selectedCat);
    const selectedLabel = selected?.label || "";

    return safeProducts.filter((p) => {
      const raw = (p.category || "").toString().trim();
      const pretty = categoryLabelMap[raw] || raw;

      return raw === selectedCat || raw === selectedLabel || pretty === selectedLabel;
    });
  }, [safeProducts, selectedCat, categories, categoryLabelMap]);

  function handleAddToCart(product) {
    if (authLoading) return;

    if (!user) {
      setLoginPopupOpen(true);
      return;
    }

    addToCart(product);
  }

  return (
    <div className="container">
      <h1 className="pageTitle">
        Plamstop{" "}
        <img
          className="inlineLogo"
          src="https://res.cloudinary.com/dlcqynjeq/image/upload/v1773331523/logo_acsjmi.png"
          alt="Plamstop logo"
        />
      </h1>
      <p className="muted">Магазин за пожарна безопасност</p>

      <h2 style={{ marginTop: 18, marginBottom: 12 }}>Категории</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 14,
          alignItems: "stretch",
          marginBottom: 18,
        }}
      >
        {categories.map((c) => {
          const isActive = selectedCat === c.key;

          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedCat(c.key)}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                textAlign: "left",
                padding: 0,
                cursor: "pointer",
                border: isActive
                  ? "1px solid rgba(255,122,24,0.7)"
                  : "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                boxShadow: isActive ? "0 0 0 2px rgba(255,122,24,0.25)" : "none",
              }}
              className={isActive ? "activeCategory" : ""}
            >
              <div
                style={{
                  height: 86,
                  backgroundImage: `url(${c.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "contrast(1.05) saturate(1.05)",
                }}
              />

              <div style={{ padding: 12 }}>
                <div
                  style={{
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.95)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                    lineHeight: 1.2,
                  }}
                >
                  {c.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {loading && <p>Зареждане на продукти…</p>}
      {error && <p className="textError">{error}</p>}

      <ProductList
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        categoryLabelMap={categoryLabelMap}
      />

      {loginPopupOpen && (
        <div
          onClick={() => setLoginPopupOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            padding: 18,
            zIndex: 3000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(460px, 100%)",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(10,12,18,0.96)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              padding: 20,
              display: "grid",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 900 }}>
              Нужно е влизане в профила
            </div>

            <div style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
              За да добавяте продукти в количката, трябва първо да влезете в профила си.
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link
                to="/auth"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,122,24,0.35)",
                  background: "rgba(255,122,24,0.18)",
                  color: "rgba(255,255,255,0.95)",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
                onClick={() => setLoginPopupOpen(false)}
              >
                Вход
              </Link>

              <button
                type="button"
                onClick={() => setLoginPopupOpen(false)}
                style={{
                  padding: "10px 14px",
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
      )}
    </div>
  );
}

export default Shop;
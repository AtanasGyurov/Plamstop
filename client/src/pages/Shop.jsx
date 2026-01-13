// client/src/pages/Shop.jsx
import { useEffect, useMemo, useState } from "react";
import api from "../api";
import ProductList from "../components/ProductList";
import { useCart } from "../cart/CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  // ✅ Category UI state
  const [selectedCat, setSelectedCat] = useState("all");

  // ✅ Categories (matches your images in /public/images/categories)
  const categories = useMemo(
    () => [
      { key: "all", label: "Всички", image: "/images/categories/project-site.jpg" },
      { key: "extinguishers", label: "Преносими пожарогасители", image: "/images/categories/extinguishers.jpg" },
      { key: "fire-alarm", label: "Пожароизвестяване", image: "/images/categories/fire-alarm.jpg" },
      { key: "alarm-panels", label: "Алармени панели и сирени", image: "/images/categories/alarm-panels.jpg" },
      { key: "emergency-lighting", label: "Аварийно осветление", image: "/images/categories/emergency-lighting.jpg" },
      { key: "hydrants-hoses", label: "Хидранти и маркучи", image: "/images/categories/hydrants-hoses.jpg" },
      { key: "exit-signs", label: "Евакуационни табели", image: "/images/categories/exit-signs.jpg" },
      { key: "inspection-tools", label: "Инструменти за инспекция", image: "/images/categories/inspection-tools.jpg" },
      { key: "evacuation-plans", label: "Евакуационни планове", image: "/images/categories/evacuation-plans.jpg" },
    ],
    []
  );

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

  // ✅ Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCat === "all") return products;

    const selected = categories.find((c) => c.key === selectedCat);
    const label = selected?.label || "";

    // If you also have older stored categories (e.g. "firesafety"),
    // you can add aliases here if needed later.
    return products.filter((p) => {
      const cat = (p.category || "").toString().trim();
      return cat === label || cat === selectedCat; // supports label or key
    });
  }, [products, selectedCat, categories]);

  return (
    <div className="container">
      <h1 className="pageTitle">
        Plamstop{" "}
        <img className="inlineLogo" src="/images/logo.png" alt="Plamstop logo" />
      </h1>
      <p className="muted">Магазин за пожарна безопасност</p>

      {/* ✅ CATEGORIES */}
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
                  ? "1px solid rgba(255,122,24,0.7)" // ✅ optional glow border
                  : "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                boxShadow: isActive
                  ? "0 0 0 2px rgba(255,122,24,0.25)" // ✅ optional glow ring
                  : "none",
              }}
              className={isActive ? "activeCategory" : ""}
            >
              {/* image */}
              <div
                style={{
                  height: 86,
                  backgroundImage: `url(${c.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "contrast(1.05) saturate(1.05)",
                }}
              />

              {/* ✅ fixed text color + removed "Избрана категория" */}
              <div style={{ padding: 12 }}>
                <div
                  style={{
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.95)", // ✅ visible on dark
                    textShadow: "0 1px 4px rgba(0,0,0,0.6)", // ✅ readability on image
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

      {/* ✅ products filtered */}
      <ProductList products={filteredProducts} onAddToCart={addToCart} />
    </div>
  );
}

export default Shop;

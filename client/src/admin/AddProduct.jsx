import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AddProduct() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(1);

  // ✅ NEW
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Моля, въведете име.");
    if (!price || Number(price) <= 0) return setError("Моля, въведете валидна цена.");
    if (!category.trim()) return setError("Моля, въведете категория.");

    setLoading(true);
    try {
      await api.post("/products", {
        name: name.trim(),
        price: Number(price),
        category: category.trim(),
        stock: Number(stock ?? 0),

        // ✅ NEW
        description: description.trim(),
        imageUrl: imageUrl.trim(),
      });

      nav("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Грешка при създаване на продукт.");
    } finally {
      setLoading(false);
    }
  }

  const field = {
    display: "grid",
    gap: 6,
  };

  const label = {
    fontWeight: 800,
    color: "rgba(255,255,255,0.92)",
  };

  const input = {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(10,12,18,0.55)",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
  };

  const help = {
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 1.35,
    marginTop: 4,
  };

  return (
    <div className="container" style={{ maxWidth: 960 }}>
      <h1 style={{ marginBottom: 14 }}>Добави продукт</h1>

      {error && (
        <div
          style={{
            border: "1px solid rgba(211,47,47,0.45)",
            background: "rgba(211,47,47,0.12)",
            padding: 10,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={submit}
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 18,
          padding: 16,
          background: "rgba(255,255,255,0.06)",
          display: "grid",
          gap: 14,
        }}
      >
        {/* ✅ 2-column grid (responsive) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.6fr",
            gap: 14,
          }}
        >
          <div style={field}>
            <label style={label}>Име</label>
            <input
              style={input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Прахов пожарогасител 6 кг (ABC)"
            />
          </div>

          <div style={field}>
            <label style={label}>Цена (евро)</label>
            <input
              style={input}
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="49.99"
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 0.6fr",
            gap: 14,
          }}
        >
          <div style={field}>
            <label style={label}>Категория</label>
            <input
              style={input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Преносими пожарогасители"
            />
          </div>

          <div style={field}>
            <label style={label}>Наличност</label>
            <input
              style={input}
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        {/* ✅ NEW fields */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div style={field}>
            <label style={label}>Описание</label>
            <textarea
              style={{ ...input, minHeight: 120, resize: "vertical" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Кратко описание, спецификации, предназначение..."
            />
          </div>

          <div style={field}>
            <label style={label}>Снимка (URL/път)</label>
            <input
              style={input}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/images/products/extinguisher_6kg.jpg"
            />
            <div style={help} className="muted">
              Сложи снимките в <strong>client/public/images/products</strong> и
              ползвай път като <strong>/images/products/ime.jpg</strong>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
          <button type="submit" className="navBtn accent" disabled={loading}>
            {loading ? "Създаване..." : "Създай"}
          </button>

          <button
            type="button"
            className="navBtn"
            onClick={() => nav("/admin/products")}
            disabled={loading}
          >
            Отказ
          </button>
        </div>
      </form>

      {/* ✅ mobile fix */}
      <style>{`
        @media (max-width: 720px) {
          .container form > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

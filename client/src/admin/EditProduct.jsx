import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const canSave = useMemo(() => {
    return name.trim() && String(price).trim() && category.trim();
  }, [name, price, category]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setError("");
      setLoading(true);
      try {
        // ✅ IMPORTANT: must be /products/:id (NOT /products/:id/edit)
        const res = await api.get(`/products/${id}`);
        const p = res.data || {};

        if (!mounted) return;
        setName(p.name ?? "");
        setPrice(p.price ?? "");
        setCategory(p.category ?? "");
        setStock(p.stock ?? "");
        setDescription(p.description ?? "");
        setImageUrl(p.imageUrl ?? "");
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError("Продуктът не беше намерен (404) или има проблем със сървъра.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (id) load();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function onSave(e) {
    e.preventDefault();
    setError("");

    if (!canSave) {
      setError("Моля попълни поне име, цена и категория.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: name.trim(),
        price: Number(price),
        category: category.trim(),
        stock: Number(stock || 0),
        description: description?.toString() ?? "",
        imageUrl: imageUrl?.toString().trim() ?? "",
      };

      await api.patch(`/products/${id}`, payload);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Грешка при запис.");
    } finally {
      setSaving(false);
    }
  }

  const cardStyle = {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 18,
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    padding: 20,
    maxWidth: 980,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: 16,
    alignItems: "start",
  };

  const twoCol = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  };

  const labelStyle = { fontWeight: 800, marginBottom: 6 };
  const inputStyle = {
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.25)",
    color: "rgba(255,255,255,0.92)",
    padding: "10px 12px",
    outline: "none",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: 120,
    resize: "vertical",
  };

  if (loading) {
    return (
      <div className="container">
        <h1 style={{ marginBottom: 14 }}>Редакция на продукт</h1>
        <div className="muted">Зареждане…</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: 14 }}>Редакция на продукт</h1>

      {error && (
        <div className="alert error" style={{ marginBottom: 12 }}>
          {error}
        </div>
      )}

      <div style={cardStyle}>
        <form onSubmit={onSave} style={gridStyle}>
          <div style={{ display: "grid", gap: 14 }}>
            <div style={twoCol}>
              <div>
                <div style={labelStyle}>Име</div>
                <input
                  style={inputStyle}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Пример: Прахов пожарогасител 6 кг (ABC)"
                />
              </div>

              <div>
                <div style={labelStyle}>Цена (евро)</div>
                <input
                  style={inputStyle}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="49.99"
                  inputMode="decimal"
                />
              </div>
            </div>

            <div style={twoCol}>
              <div>
                <div style={labelStyle}>Категория</div>
                <input
                  style={inputStyle}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="extinguishers / fire-alarm / alarm-panels ..."
                />
              </div>

              <div>
                <div style={labelStyle}>Наличност</div>
                <input
                  style={inputStyle}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="20"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div style={twoCol}>
              <div>
                <div style={labelStyle}>Описание</div>
                <textarea
                  style={textareaStyle}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Кратко описание, спецификации, предназначение…"
                />
              </div>

              <div>
                <div style={labelStyle}>Снимка (URL/път)</div>
                <input
                  style={inputStyle}
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/products/ime.jpg"
                />
                <div className="muted" style={{ marginTop: 8, fontSize: 12, lineHeight: 1.4 }}>
                  Сложи снимките в <strong>client/public/images/products</strong> и ползвай път като{" "}
                  <strong>/images/products/ime.jpg</strong>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
              <button
                type="submit"
                className="navBtn accent"
                disabled={!canSave || saving}
                style={{
                  opacity: !canSave || saving ? 0.6 : 1,
                  cursor: !canSave || saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "Запис..." : "Запази"}
              </button>

              <button type="button" className="navBtn" onClick={() => navigate("/admin/products")}>
                Отказ
              </button>
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(0,0,0,0.25)",
              minHeight: 220,
              display: "grid",
              placeItems: "center",
              padding: 12,
            }}
            title="Преглед на снимката"
          >
            <img
              src={(imageUrl || "").trim() || "/images/logo.png"}
              alt="preview"
              style={{ maxWidth: "100%", maxHeight: 220, objectFit: "contain", opacity: 0.95 }}
              onError={(e) => {
                e.currentTarget.src = "/images/logo.png";
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

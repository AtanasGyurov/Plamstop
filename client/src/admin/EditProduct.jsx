// client/src/admin/EditProduct.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  // ✅ NEW
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data || {};
        setName(p.name || "");
        setPrice(p.price ?? "");
        setCategory(p.category || "");
        setStock(p.stock ?? 0);

        // ✅ NEW
        setDescription(p.description || "");
        setImageUrl(p.imageUrl || "");
      } catch (e) {
        console.error(e);
        setErr("Неуспешно зареждане на продукта.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setSaving(true);

    try {
      const payload = {
        name: name.trim(),
        price: Number(price),
        category: category.trim(),
        stock: Number(stock),

        // ✅ NEW
        description: description.trim(),
        imageUrl: imageUrl.trim(),
      };

      await api.put(`/products/${id}`, payload);
      nav("/admin/products");
    } catch (e2) {
      console.error(e2);
      setErr("Грешка при запис.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="muted">Зареждане…</p>;

  return (
    <div className="container">
      <h1>Редакция на продукт</h1>
      {err && <p style={{ color: "salmon" }}>{err}</p>}

      <form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
        <label>Име</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Цена (евро)</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          step="0.01"
        />

        <label>Категория</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />

        <label>Наличност</label>
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          min="0"
        />

        {/* ✅ NEW */}
        <label>Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <label>Снимка (URL/път)</label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="/images/products/..."
        />

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button type="submit" disabled={saving}>
            {saving ? "Запис…" : "Запази"}
          </button>
          <button type="button" onClick={() => nav("/admin/products")}>
            Отказ
          </button>
        </div>
      </form>
    </div>
  );
}

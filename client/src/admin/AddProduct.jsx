import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function createProduct(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/products", {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock || 0),
      });

      nav("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Неуспешно създаване на продукт.");
    }
  }

  return (
    <div>
      <h1>Добави продукт</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={createProduct}>
        <div style={{ marginBottom: 10 }}>
          <label>Име: </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ padding: 6, width: 260 }}
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Цена (евро): </label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            style={{ padding: 6, width: 260 }}
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Категория: </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ padding: 6, width: 260 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Наличност: </label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            style={{ padding: 6, width: 260 }}
          />
        </div>

        <button type="submit" style={{ marginRight: 10 }}>
          Създай
        </button>
        <button type="button" onClick={() => nav("/admin/products")}>
          Отказ
        </button>
      </form>
    </div>
  );
}

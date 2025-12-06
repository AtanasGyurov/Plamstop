// client/src/admin/AddProduct.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // Send to backend
      await api.post("/products", {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
      });

      nav("/admin/products"); // Redirect after success
    } catch (err) {
      console.error(err);
      setError("Failed to create product");
    }
  }

  return (
    <div style={{ color: "white" }}>
      <h1>Add New Product</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Price (лв):</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Category:</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Stock:</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 18px",
            background: "limegreen",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Product
        </button>
      </form>
    </div>
  );
}

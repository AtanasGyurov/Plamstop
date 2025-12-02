// client/src/admin/AdminProducts.jsx

import { useEffect, useState } from "react";
import api from "../api";        // ✅ FIXED — default import
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/products");   // ✅ CALL WORKS
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      }
    }

    load();
  }, []);

  async function deleteProduct(id) {
    if (!window.confirm("Delete product?")) return;

    try {
      await api.delete(`/products/${id}`);  // ✅ DELETE works
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  return (
    <div>
      <h1>Admin – Products</h1>
      <Link to="/admin/products/add">Add Product</Link>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ margin: "10px 0" }}>
            {p.name} — ${p.price}
            <Link to={`/admin/products/${p.id}`}> Edit </Link>
            <button onClick={() => deleteProduct(p.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

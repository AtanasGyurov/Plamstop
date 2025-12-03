// client/src/admin/AdminProducts.jsx

import { useEffect, useState } from "react";
import api from "../api";            // ✅ use only api instance
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Load all products
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/products");   // ✅ FIXED
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      }
    }

    load();
  }, []);

  // Delete product
  async function deleteProduct(id) {
    if (!window.confirm("Delete product?")) return;

    try {
      await api.delete(`/products/${id}`);        // ✅ WORKS
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  return (
    <div>
      <h1>Products (Admin)</h1>

      <Link to="/admin/products/new">
        <button style={{ padding: "8px 12px", marginBottom: "15px" }}>
          + Add Product
        </button>
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="10" style={{ width: "100%", color: "white" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (лв)</th>
            <th>ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.id}</td>

              {/* EDIT BUTTON */}
              <td>
                <Link to={`/admin/products/${p.id}`}>
                  <button>Edit</button>
                </Link>
              </td>

              {/* DELETE BUTTON */}
              <td>
                <button onClick={() => deleteProduct(p.id)} style={{ color: "red" }}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// client/src/admin/AdminProducts.jsx

import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // ---------------------------
  // Load all products
  // ---------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []); // Prevents undefined crash
      } catch (err) {
        console.error("Load products error:", err);
        setError("Failed to load products");
      }
    }
    load();
  }, []);

  // ---------------------------
  // Delete product
  // ---------------------------
  async function deleteProduct(id) {
    if (!window.confirm("Delete product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Products (Admin)</h1>

      {/* Add Product Button */}
      <Link to="/admin/products/new">
        <button
          style={{
            padding: "8px 14px",
            marginBottom: "20px",
            background: "#4caf50",
            border: "none",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add Product
        </button>
      </Link>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* No Products Case */}
      {products.length === 0 && (
        <p style={{ marginTop: "20px", opacity: 0.6 }}>No products added yet.</p>
      )}

      {/* Products Table */}
      {products.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            marginTop: "10px",
            background: "#1c1c1c",
            color: "white",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#333" }}>
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
                <td style={{ fontSize: "12px", opacity: 0.7 }}>{p.id}</td>

                {/* EDIT BUTTON */}
                <td>
                  <Link to={`/admin/products/${p.id}/edit`}>
                    <button
                      style={{
                        padding: "5px 10px",
                        background: "#1976d2",
                        border: "none",
                        color: "white",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                </td>

                {/* DELETE BUTTON */}
                <td>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    style={{
                      padding: "5px 10px",
                      background: "#c62828",
                      border: "none",
                      color: "white",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

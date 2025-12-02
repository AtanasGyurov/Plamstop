// client/src/admin/EditProduct.jsx

import { useEffect, useState } from "react";
import api from "../api";                     // ✅ DEFAULT IMPORT
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  // Load product
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/products/${id}`);   // ✅ FIXED
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      }
    }
    load();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function save() {
    try {
      await api.patch(`/products/${id}`, product);  // ✅ FIXED
      nav("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  }

  async function remove() {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);          // ✅ FIXED
      nav("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  return (
    <div>
      <h1>Edit Product</h1>

      {Object.keys(product).map((key) =>
        key !== "id" ? (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label>{key}: </label>
            <input
              name={key}
              value={product[key]}
              onChange={handleChange}
              style={{ padding: "5px", width: "250px" }}
            />
          </div>
        ) : null
      )}

      <button onClick={save} style={{ marginRight: "10px" }}>
        Save
      </button>

      <button onClick={remove} style={{ color: "red" }}>
        Delete
      </button>
    </div>
  );
}

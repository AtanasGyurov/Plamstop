import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function save() {
    await api.updateProduct(id, product);
    nav("/admin/products");
  }

  async function remove() {
    if (window.confirm("Delete this product?")) {
      await api.deleteProduct(id);
      nav("/admin/products");
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

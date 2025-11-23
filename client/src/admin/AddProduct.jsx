import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function create() {
    await api.createProduct(form);
    nav("/admin/products");
  }

  return (
    <div>
      <h1>Add Product</h1>

      {Object.keys(form).map((key) => (
        <div key={key} style={{ marginBottom: "10px" }}>
          <label>{key}: </label>
          <input
            name={key}
            value={form[key]}
            onChange={handleChange}
            style={{ padding: "5px", width: "250px" }}
          />
        </div>
      ))}

      <button onClick={create}>Create Product</button>
    </div>
  );
}


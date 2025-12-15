import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  // Зареждане на продукта
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Неуспешно зареждане на продукта.");
      }
    }
    load();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Зареждане...</p>;

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function save() {
    try {
      await api.patch(`/products/${id}`, product);
      nav("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Неуспешно запазване на продукта.");
    }
  }

  async function remove() {
    if (!window.confirm("Да изтрием ли този продукт?")) return;

    try {
      await api.delete(`/products/${id}`);
      nav("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Неуспешно изтриване на продукта.");
    }
  }

  return (
    <div>
      <h1>Редакция на продукт</h1>

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
        Запази
      </button>

      <button onClick={remove} style={{ color: "red" }}>
        Изтрий
      </button>
    </div>
  );
}

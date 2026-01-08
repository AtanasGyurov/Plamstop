import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Неуспешно зареждане на продуктите.");
      }
    }
    load();
  }, []);

  async function deleteProduct(id) {
    if (!window.confirm("Да изтрием ли този продукт?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Неуспешно изтриване на продукта.");
    }
  }

  return (
    <div>
      <h1>Продукти (Админ)</h1>

      <Link to="/admin/products/new">
        <button style={{ padding: "8px 12px", marginBottom: "15px" }}>
          + Добави продукт
        </button>
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", color: "white" }}
      >
        <thead>
          <tr>
            <th>Име</th>
            <th>Цена (евро)</th>
            <th>ID</th>
            <th>Редакция</th>
            <th>Изтриване</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.id}</td>

              <td>
                <Link to={`/admin/products/${p.id}/edit`}>
                  <button>Редактирай</button>
                </Link>
              </td>

              <td>
                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{ color: "red" }}
                >
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

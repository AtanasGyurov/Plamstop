import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <Link to="/admin/products/new">
        <button style={{ padding: "8px 12px", marginBottom: "15px" }}>
          + Add Product
        </button>
      </Link>

      <table border="1" cellPadding="10" style={{ width: "100%", color: "white" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>ID</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price} лв</td>
              <td>{p.id}</td>
              <td>
                <Link to={`/admin/products/${p.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

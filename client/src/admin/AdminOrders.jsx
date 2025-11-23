import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await api.getAdminOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>All Orders</h1>
      <button onClick={load} disabled={loading}>
        {loading ? "Loading…" : "Refresh"}
      </button>

      <ul>
        {orders.map((o) => (
          <li key={o.id} style={{ marginBottom: "1rem" }}>
            <strong>Order ID:</strong> {o.id} <br />
            <strong>Name:</strong> {o.customerName} <br />
            <strong>Email:</strong> {o.customerEmail} <br />
            <strong>Status:</strong> {o.status} <br />

            <strong>Items:</strong>
            <ul>
              {o.items.map((i, idx) => (
                <li key={idx}>
                  {i.productId} — qty {i.quantity}
                </li>
              ))}
            </ul>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

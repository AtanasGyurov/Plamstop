import { useEffect, useState } from "react";
import api from "../api";   // ✅ use axios instance with auto token

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await api.get("/orders");   // ✅ correct endpoint
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("My orders error:", err);
        setError("Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (orders.length === 0) return <p>You haven’t placed any orders yet.</p>;

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #555",
            padding: "10px",
            marginBottom: "15px",
            color: "white",
          }}
        >
          <strong>ID:</strong> {o.id}<br />
          <strong>Status:</strong> {o.status}<br />
          <strong>Total:</strong> {o.totalAmount} лв<br />

          <strong>Items:</strong>
          <ul>
            {o.items?.map((i) => (
              <li key={i.id}>
                {i.name} — {i.quantity} × {i.price} лв
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

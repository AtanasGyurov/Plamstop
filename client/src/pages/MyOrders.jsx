// client/src/pages/MyOrders.jsx

import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      setLoading(false);
      return;
    }

    api.getMyOrders(token)
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        else setOrders([]);
      })
      .catch((err) => {
        console.error("My orders error:", err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Cancel order handler
  async function handleCancel(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    const result = await api.cancelOrder(id, token);

    if (result.error) {
      alert(result.error);
      return;
    }

    // Refresh orders after cancel
    const updated = await api.getMyOrders(token);
    setOrders(updated);
  }

  // Rendering
  // Prepare visible orders (hide cancelled)
const visibleOrders = orders.filter(o => o.status !== "cancelled");

if (!user) return <p>Please log in to view your orders.</p>;
if (loading) return <p>Loading your orders...</p>;
if (visibleOrders.length === 0) return <p>You haven’t placed any orders yet.</p>;

return (
  <div style={{ padding: "1.5rem" }}>
    <h1>My Orders</h1>

    {visibleOrders.map((o) => (
      <div
        key={o.id}
        style={{
          border: "1px solid #666",
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "15px",
          background: "#222",
        }}
      >
        <strong>Order ID:</strong> {o.id}<br />
        <strong>Total:</strong> {o.totalAmount} лв<br />
        <strong>Status:</strong> {o.status}<br />
        <strong>Date:</strong> {o.createdAt ? new Date(o.createdAt).toLocaleString() : "N/A"}<br />

        <strong>Items:</strong>
        <ul>
          {o.items?.map((i) => (
            <li key={i.id}>
              {i.name} — {i.quantity} × {i.price} лв
            </li>
          ))}
        </ul>

        {(o.status === "pending" || o.status === "confirmed") && (
          <button
            onClick={() => handleCancel(o.id)}
            style={{
              marginTop: "10px",
              backgroundColor: "#c62828",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel Order
          </button>
        )}
      </div>
    ))}
  </div>
);
}
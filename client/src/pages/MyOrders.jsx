// client/src/pages/MyOrders.jsx

import { useEffect, useState } from "react";
import api, { getMyOrders } from "../api";   // ✅ FIXED IMPORT
import { useAuth } from "../auth/AuthContext";

export default function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders when logged in
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const data = await getMyOrders();   // ✅ getMyOrders() handles token automatically
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("My orders error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  // Cancel order handler
  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      // Backend route: PATCH /api/orders/:id/cancel
      await api.patch(`/orders/${id}/cancel`);    // ✅ correct cancel call

      // Refresh list
      const updated = await getMyOrders();
      setOrders(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order.");
    }
  }

  // Filter out cancelled orders
  const visibleOrders = orders.filter((o) => o.status !== "cancelled");

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
          <strong>Date:</strong>{" "}
          {o.createdAt ? new Date(o.createdAt).toLocaleString() : "N/A"}
          <br />

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

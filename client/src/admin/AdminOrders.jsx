import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  function applyFilter(list, f) {
    if (f === "all") return list;
    return list.filter((o) => o.status === f);
  }

  async function loadOrders() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/orders/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load admin orders");

      const data = await res.json();
      setOrders(data);
      setFilteredOrders(applyFilter(data, filter));
    } catch (err) {
      console.error("Admin orders fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(applyFilter(orders, filter));
  }, [filter, orders]);

  // ============================
  // UPDATE ORDER STATUS
  // ============================
  async function updateStatus(id, newStatus) {
    const token = localStorage.getItem("token");

    if (!window.confirm(`Change status to "${newStatus}"?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Status update failed");

      loadOrders();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update status");
    }
  }

  // ============================
  // DELETE ORDER
  // ============================
  async function deleteOrder(id) {
    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this order permanently?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/admin/orders/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete order");
    }
  }

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div>
      <h1>Orders</h1>

      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        {["all", "pending", "confirmed", "shipped", "completed", "cancelled"].map(
          (s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{ marginRight: 10 }}
            >
              {s.toUpperCase()}
            </button>
          )
        )}
      </div>

      {filteredOrders.length === 0 && <p>No orders found.</p>}

      {filteredOrders.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #666",
            padding: 15,
            marginBottom: 15,
            background: "#222",
          }}
        >
          <strong>ID:</strong> {o.id} <br />
          <strong>Name:</strong> {o.customerName} <br />
          <strong>Email:</strong> {o.customerEmail} <br />
          <strong>Total:</strong> {o.totalAmount} лв <br />
          <strong>Status:</strong> {o.status.toUpperCase()} <br />

          <strong>Items:</strong>
          <ul>
            {o.items?.map((i) => (
              <li key={i.id}>
                {i.name} — {i.quantity} × {i.price} лв
              </li>
            ))}
          </ul>

          {/* ACTION BUTTONS */}
          <div style={{ marginTop: 10 }}>
            {o.status === "pending" && (
              <button onClick={() => updateStatus(o.id, "confirmed")}>
                Confirm
              </button>
            )}

            {o.status === "confirmed" && (
              <button onClick={() => updateStatus(o.id, "shipped")}>
                Ship
              </button>
            )}

            {o.status === "shipped" && (
              <button onClick={() => updateStatus(o.id, "completed")}>
                Complete
              </button>
            )}

            {o.status !== "cancelled" && (
              <button
                onClick={() => updateStatus(o.id, "cancelled")}
                style={{ color: "red", marginLeft: 10 }}
              >
                Cancel
              </button>
            )}

            {/* DELETE */}
            <button
              onClick={() => deleteOrder(o.id)}
              style={{ marginLeft: 10, background: "darkred", color: "white" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

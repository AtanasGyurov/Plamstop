import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found — admin requests blocked.");
      setLoading(false);
      return;
    }

    const url = "http://localhost:5000/api/orders/admin/orders";

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        else setOrders([]);
      })
      .catch((err) => {
        console.error("Admin orders fetch error:", err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((o) => (
        <div key={o.id} style={{ border: "1px solid #666", padding: 10, marginBottom: 10 }}>
          <strong>ID:</strong> {o.id}<br />
          <strong>Name:</strong> {o.customerName}<br />
          <strong>Email:</strong> {o.customerEmail}<br />
          <strong>Total:</strong> {o.totalAmount} лв<br />
          <strong>Status:</strong> {o.status}<br />
          <strong>Items:</strong>
          <ul>
            {o.items?.map((i) => (
              <li key={i.id}>{i.name} — {i.quantity} × {i.price} лв</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await api.get("/orders");
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Неуспешно зареждане на поръчките.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) return <p>Зареждане на поръчките…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (orders.length === 0) return <p>Все още нямате поръчки.</p>;

  return (
    <div>
      <h1>Моите поръчки</h1>

      {orders.map((o) => (
        <div key={o.id} style={{ border: "1px solid #555", padding: 10 }}>
          <strong>ID:</strong> {o.id} <br />
          <strong>Статус:</strong> {o.status} <br />
          <strong>Обща сума:</strong> {o.totalAmount} лв
        </div>
      ))}
    </div>
  );
}

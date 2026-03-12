import { useEffect, useState } from "react";
import api from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const statusLabel = (s) => {
    switch (s) {
      case "all":
        return "Всички";
      case "pending":
        return "В изчакване";
      case "confirmed":
        return "Потвърдени";
      case "shipped":
        return "Изпратени";
      case "completed":
        return "Завършени";
      case "cancelled":
        return "Отказани";
      default:
        return s;
    }
  };

  function applyFilter(list, f) {
    if (f === "all") return list;
    return list.filter((o) => o.status === f);
  }

  async function loadOrders() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/orders/admin/orders");

      const data = res.data;
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

  // UPDATE ORDER STATUS
  async function updateStatus(id, newStatus) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const label = statusLabel(newStatus);
    if (!window.confirm(`Да променим ли статуса на „${label}“?`)) return;

    try {
      await api.patch(`/orders/${id}/status`, { status: newStatus });
      loadOrders();
    } catch (err) {
      console.error("Update error:", err);
      alert("Неуспешна промяна на статуса.");
    }
  }

  // DELETE ORDER
  async function deleteOrder(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Да изтрием ли поръчката завинаги?")) return;

    try {
      await api.delete(`/orders/admin/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Неуспешно изтриване на поръчката.");
    }
  }

  if (loading) return <p style={{ color: "white" }}>Зареждане...</p>;

  return (
    <div>
      <h1>Поръчки</h1>

      {/* ФИЛТРИ */}
      <div style={{ marginBottom: 20 }}>
        {["all", "pending", "confirmed", "shipped", "completed", "cancelled"].map(
          (s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{ marginRight: 10 }}
            >
              {statusLabel(s)}
            </button>
          )
        )}
      </div>

      {filteredOrders.length === 0 && <p>Няма намерени поръчки.</p>}

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
          <strong>Име:</strong> {o.customerName} <br />
          <strong>Имейл:</strong> {o.customerEmail} <br />
          <strong>Общо:</strong> {o.totalAmount} евро <br />
          <strong>Статус:</strong> {statusLabel(o.status)} <br />

          <strong>Артикули:</strong>
          <ul>
            {o.items?.map((i) => (
              <li key={i.id}>
                {i.name} — {i.quantity} × {i.price} евро
              </li>
            ))}
          </ul>

          {/* ДЕЙСТВИЯ */}
          <div style={{ marginTop: 10 }}>
            {o.status === "pending" && (
              <button onClick={() => updateStatus(o.id, "confirmed")}>
                Потвърди
              </button>
            )}

            {o.status === "confirmed" && (
              <button onClick={() => updateStatus(o.id, "shipped")}>
                Изпрати
              </button>
            )}

            {o.status === "shipped" && (
              <button onClick={() => updateStatus(o.id, "completed")}>
                Завърши
              </button>
            )}

            {o.status !== "cancelled" && (
              <button
                onClick={() => updateStatus(o.id, "cancelled")}
                style={{ color: "red", marginLeft: 10 }}
              >
                Откажи
              </button>
            )}

            <button
              onClick={() => deleteOrder(o.id)}
              style={{ marginLeft: 10, background: "darkred", color: "white" }}
            >
              Изтрий
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
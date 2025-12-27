// client/src/admin/AdminDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setErr("");

      try {
        const [pRes, oRes] = await Promise.all([
          api.get("/products"),
          api.get("/orders/admin/orders"),
        ]);

        if (!alive) return;

        setProducts(Array.isArray(pRes.data) ? pRes.data : []);
        setOrders(Array.isArray(oRes.data) ? oRes.data : []);
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setErr("Неуспешно зареждане на статистиките за админ панела.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const stats = useMemo(() => {
    const totalProducts = products.length;

    const totalOrders = orders.length;

    const pending = orders.filter((o) => o.status === "pending").length;
    const confirmed = orders.filter((o) => o.status === "confirmed").length;
    const shipped = orders.filter((o) => o.status === "shipped").length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;

    const revenueCompleted = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

    // Use updatedAt/createdAt if available, fallback to 0
    const latestOrders = [...orders]
      .sort((a, b) => {
        const ta =
          (a.updatedAt?.seconds ? a.updatedAt.seconds * 1000 : 0) ||
          Date.parse(a.updatedAt) ||
          (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0) ||
          Date.parse(a.createdAt) ||
          0;

        const tb =
          (b.updatedAt?.seconds ? b.updatedAt.seconds * 1000 : 0) ||
          Date.parse(b.updatedAt) ||
          (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0) ||
          Date.parse(b.createdAt) ||
          0;

        return tb - ta;
      })
      .slice(0, 5);

    return {
      totalProducts,
      totalOrders,
      pending,
      confirmed,
      shipped,
      completed,
      cancelled,
      revenueCompleted,
      latestOrders,
    };
  }, [products, orders]);

  return (
    <div className="container">
      <h1 className="pageTitle">Админ табло</h1>
      <p className="muted">
        Тук виждаш ключови статистики и бързи действия за управление на магазина.
      </p>

      {loading && <p>Зареждане…</p>}
      {err && <p className="textError">{err}</p>}

      {!loading && !err && (
        <>
          {/* STATS GRID */}
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              width: "100%",
            }}
          >
            <StatCard title="Продукти" value={stats.totalProducts} note="общо в каталога" />
            <StatCard title="Поръчки" value={stats.totalOrders} note="общо създадени" />
            <StatCard title="Чакащи" value={stats.pending} note="pending" />
            <StatCard title="Потвърдени" value={stats.confirmed} note="confirmed" />
            <StatCard title="Изпратени" value={stats.shipped} note="shipped" />
            <StatCard title="Завършени" value={stats.completed} note="completed" />
            <StatCard title="Отказани" value={stats.cancelled} note="cancelled" />
            <StatCard
              title="Приход (завършени)"
              value={`${stats.revenueCompleted.toFixed(2)} лв`}
              note="само completed"
            />
          </div>

          {/* QUICK ACTIONS */}
          <div
            style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 10 }}>Бързи действия</div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="navBtn" to="/admin/products">
                Управление на продукти
              </Link>
              <Link className="navBtn" to="/admin/orders">
                Управление на поръчки
              </Link>
              <Link className="navBtn" to="/shop">
                Отвори магазина
              </Link>
            </div>
          </div>

          {/* LATEST ORDERS */}
          <div style={{ marginTop: 18 }}>
            <h2 style={{ margin: "18px 0 12px" }}>Последни поръчки</h2>

            {stats.latestOrders.length === 0 ? (
              <p className="muted">Няма поръчки за показване.</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {stats.latestOrders.map((o) => (
                  <div
                    key={o.id}
                    style={{
                      padding: 14,
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ minWidth: 240 }}>
                      <div style={{ fontWeight: 900 }}>
                        #{o.id?.slice?.(0, 8) || o.id}
                      </div>
                      <div className="muted" style={{ fontSize: 13 }}>
                        {o.customerEmail || "—"}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "1px solid rgba(255,122,24,0.35)",
                          background: "rgba(255,122,24,0.12)",
                          fontSize: 12,
                          fontWeight: 800,
                        }}
                      >
                        {o.status || "—"}
                      </span>

                      <div style={{ fontWeight: 900 }}>
                        {(Number(o.totalAmount) || 0).toFixed(2)} лв
                      </div>

                      <Link className="navBtn" to="/admin/orders">
                        Отвори
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value, note }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ fontWeight: 900, opacity: 0.95 }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 1000, marginTop: 6 }}>{value}</div>
      <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>
        {note}
      </div>
    </div>
  );
}

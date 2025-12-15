import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminLayout() {
  const { user, role } = useAuth();

  // Само админи
  if (!user || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#111" }}>
      {/* Странично меню */}
      <div
        style={{
          width: "240px",
          background: "#1c1c1c",
          padding: "20px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Админ панел 🔥</h2>

        <Link to="/admin" style={{ color: "white" }}>
          Табло
        </Link>
        <Link to="/admin/products" style={{ color: "white" }}>
          Продукти
        </Link>
        <Link to="/admin/products/new" style={{ color: "white" }}>
          + Добави продукт
        </Link>
        <Link to="/admin/orders" style={{ color: "white" }}>
          Поръчки
        </Link>
      </div>

      {/* Основно съдържание */}
      <div
        style={{
          flex: 1,
          background: "#222",
          padding: "30px",
          color: "white",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

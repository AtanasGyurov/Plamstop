// client/src/admin/AdminLayout.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

export default function AdminLayout() {
  const { user, role, loading, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Guard: wait auth, then allow ONLY admins
  useEffect(() => {
    if (loading) return;

    // not logged in
    if (!user) {
      navigate("/auth/login", { replace: true });
      return;
    }

    // logged in but not admin
    if (role !== "admin") {
      navigate("/", { replace: true });
      return;
    }
  }, [loading, user, role, navigate]);

  function exitAdmin() {
    navigate("/");
  }

  // ✅ Don’t render admin pages until auth is ready (prevents 401 timing issue)
  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p style={{ color: "white" }}>Зареждане…</p>
        </div>
      </div>
    );
  }

  // While redirecting, render nothing
  if (!user || role !== "admin") return null;

  return (
    <div className="page">
      {/* ADMIN HEADER */}
      <header className="siteHeader">
        <div className="headerInner headerInnerFull">
          <div className="left">
            <div className="brand">
              <span className="brandName">Plamstop</span>
              <img
                className="brandLogo"
                src="/images/logo.png"
                alt="Plamstop logo"
              />
            </div>

            <nav className="navLinks">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
              >
                Табло
              </NavLink>

              <NavLink
                to="/admin/products"
                className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
              >
                Продукти
              </NavLink>

              <NavLink
                to="/admin/orders"
                className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
              >
                Поръчки
              </NavLink>
            </nav>
          </div>

          <div className="navRight">
            <button className="navBtn" onClick={exitAdmin}>
              ← Към сайта
            </button>

            <button className="navBtn danger" onClick={logout}>
              Изход
            </button>
          </div>
        </div>
      </header>

      {/* ADMIN CONTENT */}
      <main className="pageMain">
        <Outlet />
      </main>
    </div>
  );
}

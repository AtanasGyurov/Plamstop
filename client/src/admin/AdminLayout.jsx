import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function exitAdmin() {
    navigate("/");
  }

  return (
    <div className="page">
      {/* ADMIN HEADER */}
      <header className="siteHeader">
        <div className="headerInner headerInnerFull">
          <div className="left">
            <div className="brand">
              <span className="brandName">Plamstop</span>
              <span className="brandEmoji">🔥</span>
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
            {/* ✅ EXIT ADMIN */}
            <button className="navBtn" onClick={exitAdmin}>
              ← Към сайта
            </button>

            {/* LOGOUT */}
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

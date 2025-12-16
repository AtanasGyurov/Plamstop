import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();

  return (
    <header className="nav">
      <div className="navInner">
        <div className="brand">
          <Link to="/" className="brandLink">
            <span className="brandName">Plamstop</span>
            <span className="brandEmoji">🔥</span>
          </Link>
        </div>

        <nav className="navLinks">
          <NavLink to="/" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
            Начало
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
            За нас
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
            Магазин
          </NavLink>

          {user && role !== "admin" && (
            <NavLink to="/my-orders" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
              Моите поръчки
            </NavLink>
          )}

          {user && role === "admin" && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? "tab active danger" : "tab danger")}>
              Администрация
            </NavLink>
          )}
        </nav>

        <div className="navRight">
          {!user ? (
            <Link to="/auth/login" className="btn btnPrimary">
              Вход / Регистрация
            </Link>
          ) : (
            <>
              <div className="userBadge">
                Влезли сте като <strong>{user.email}</strong> <span className="muted">({role})</span>
              </div>
              <button className="btn btnDanger" onClick={logout}>
                Изход
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();

  return (
    <header className="siteHeader">
      <div className="headerInner">
        <div className="brand">
          <span className="brandName">Plamstop</span>
          <span className="brandEmoji">🔥</span>
        </div>

        <nav className="navLinks">
          <NavLink to="/" className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}>
            Начало
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}>
            За нас
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `navBtn accent ${isActive ? "active" : ""}`}>
            Магазин
          </NavLink>
        </nav>

        <div className="navRight">
          {!user ? (
            <NavLink to="/auth/login" className="navBtn">
              Вход / Регистрация
            </NavLink>
          ) : (
            <>
              <div className="whoami">
                Влезли сте като <strong>{user.email}</strong> <span className="muted">({role})</span>
              </div>

              {role !== "admin" && (
                <NavLink to="/my-orders" className="navBtn">
                  Моите поръчки
                </NavLink>
              )}

              {role === "admin" && (
                <NavLink to="/admin" className="navBtn danger">
                  Администрация
                </NavLink>
              )}

              <button className="navBtn danger" onClick={logout}>
                Изход
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

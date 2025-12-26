import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";

export default function Navbar({ onOpenCart }) {
  const { user, role, logout } = useAuth();
  const { totalQty } = useCart();

  return (
    <header className="siteHeader">
      <div className="headerInner headerInnerFull">
        <div className="left">
          <div className="brand">
            <span className="brandName">Plamstop</span>
            <span className="brandEmoji">🔥</span>
          </div>

          <nav className="navLinks">
            <NavLink
              to="/"
              className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
            >
              Начало
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
            >
              За нас
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `navBtn ${isActive ? "active accent" : ""}`
              }
            >
              Магазин
            </NavLink>

            <NavLink
              to="/contacts"
              className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
            >
              Контакти
            </NavLink>
          </nav>
        </div>

        <div className="navRight">
          {!user ? (
            <NavLink to="/auth/login" className="navBtn">
              Вход / Регистрация
            </NavLink>
          ) : (
            <>
              {/* ✅ WHOAMI FIRST */}
              <div className="whoami">
                Влезли сте като <strong>{user.email}</strong>{" "}
                <span className="muted">({role})</span>
              </div>

              {/* ✅ CART AFTER WHOAMI */}
              <button
                type="button"
                className="navBtn"
                onClick={onOpenCart}
                aria-label="Отвори количката"
              >
                Количка <span className="badge">{totalQty}</span>
              </button>

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

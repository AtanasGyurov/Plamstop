import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";
import CartDrawer from "../cart/CartDrawer";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const { totalQty } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="siteHeader">
        <div className="headerInner">
          <div className="left">
            <Link to="/" className="brand">
              <span className="brandName">Plamstop</span>
              <span className="brandEmoji" aria-hidden>
                🔥
              </span>
            </Link>

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
                  `navBtn accent ${isActive ? "active" : ""}`
                }
              >
                Магазин
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
                <div className="whoami">
                  Влезли сте като <strong>{user.email}</strong>{" "}
                  <span className="muted">({role})</span>
                </div>

                <button className="navBtn" onClick={() => setCartOpen(true)}>
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

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        defaultEmail={user?.email || ""}
      />
    </>
  );
}

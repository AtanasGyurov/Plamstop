import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";

export default function Navbar({ onOpenCart }) {
  const { user, role, logout } = useAuth();
  const { totalQty } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="siteHeader">
      <div className="headerInner headerInnerFull">
        <div className="left">
          <div className="brand">
            <span className="brandName">Plamstop</span>
            <img
              className="brandLogo"
              src="https://res.cloudinary.com/dlcqynjeq/image/upload/v1773331523/logo_acsjmi.png"
              alt="Plamstop logo"
            />
          </div>

          {/* ✅ Hamburger button */}
          <button
            type="button"
            className="mobileMenuBtn"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

          {/* ✅ LEFT NAV */}
          <nav className={`navLinks ${mobileOpen ? "mobileOpen" : ""}`}>
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
            >
              Начало
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
            >
              За нас
            </NavLink>

            <NavLink
              to="/shop"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navBtn ${isActive ? "active accent" : ""}`
              }
            >
              Магазин
            </NavLink>

            <NavLink
              to="/fire-safety"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navBtn ${isActive ? "active accent" : ""}`
              }
            >
              Пожарна безопасност
            </NavLink>

            <NavLink
              to="/contacts"
              onClick={closeMobileMenu}
              className={({ isActive }) => `navBtn ${isActive ? "active" : ""}`}
            >
              Контакти
            </NavLink>
          </nav>
        </div>

        {/* ✅ RIGHT SIDE */}
        <div className={`navRight ${mobileOpen ? "mobileOpen" : ""}`}>
          {!user ? (
            <NavLink
              to="/auth/login"
              className="navBtn"
              onClick={closeMobileMenu}
            >
              Вход / Регистрация
            </NavLink>
          ) : (
            <>
              <div className="whoami">
                Влезли сте като <strong>{user.email}</strong>{" "}
                <span className="muted">({role})</span>
              </div>

              <button
                type="button"
                className="navBtn"
                onClick={() => {
                  onOpenCart?.();
                  closeMobileMenu();
                }}
              >
                Количка <span className="badge">{totalQty}</span>
              </button>

              {role !== "admin" && (
                <NavLink
                  to="/my-orders"
                  className="navBtn"
                  onClick={closeMobileMenu}
                >
                  Моите поръчки
                </NavLink>
              )}

              {role === "admin" && (
                <NavLink
                  to="/admin"
                  className="navBtn danger"
                  onClick={closeMobileMenu}
                >
                  Администрация
                </NavLink>
              )}

              <button
                className="navBtn danger"
                onClick={() => {
                  closeMobileMenu();
                  logout();
                }}
              >
                Изход
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
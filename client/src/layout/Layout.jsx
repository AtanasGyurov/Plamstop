import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";

export default function Layout() {
  const { user } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="page">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main className="pageMain">
        <Outlet />
      </main>

      <Footer />

      {/* ✅ Global drawer (works on ALL pages) */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        defaultEmail={user?.email || ""}
      />
    </div>
  );
}

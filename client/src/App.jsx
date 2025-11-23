import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";

import Shop from "./pages/Shop";
import AuthPage from "./auth/AuthPage";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminLayout from "./admin/AdminLayout";

function Header() {
  const { user, role } = useAuth();

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #444" }}>
      <h1>Plamstop 🔥</h1>

      {!user ? (
        <Link to="/auth/login">
          <button>Login / Register</button>
        </Link>
      ) : (
        <div>
          Logged in as <strong>{user.email}</strong> ({role})
          <Link to="/">
            <button style={{ marginLeft: "1rem" }}>Shop</button>
          </Link>
          {role === "admin" && (
            <Link to="/admin">
              <button style={{ marginLeft: "1rem" }}>Admin</button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          {/* SHOP */}
          <Route path="/" element={<Shop />} />

          {/* AUTH */}
          <Route path="/auth/*" element={<AuthPage />} />

          {/* ADMIN (protected inside AdminLayout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

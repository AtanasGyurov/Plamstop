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
import MyOrders from "./pages/MyOrders";

function Header() {
  const { user, role, logout } = useAuth();

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

          {/* SHOW TO NORMAL USERS */}
          {role !== "admin" && (
            <Link to="/my-orders">
              <button style={{ marginLeft: "1rem" }}>My Orders</button>
            </Link>
          )}

          {/* SHOW TO ADMINS */}
          {role === "admin" && (
            <Link to="/admin">
              <button style={{ marginLeft: "1rem" }}>Admin</button>
            </Link>
          )}

          <button
            style={{
              marginLeft: "1rem",
              backgroundColor: "#c62828",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={logout}
          >
            Logout
          </button>
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

          <Route path="/my-orders" element={<MyOrders />} />

          {/* ADMIN (protected inside AdminLayout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            {/* FIXED ADMIN ROUTES */}
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />

            <Route path="orders" element={<AdminOrders />} />

            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

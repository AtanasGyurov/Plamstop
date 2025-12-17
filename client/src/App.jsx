// client/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { CartProvider } from "./cart/CartContext";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import AuthPage from "./auth/AuthPage";
import MyOrders from "./pages/MyOrders";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminOrders from "./admin/AdminOrders";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* GLOBAL SITE LAYOUT (Navbar + Footer) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="shop" element={<Shop />} />

              <Route path="auth/*" element={<AuthPage />} />
              <Route path="my-orders" element={<MyOrders />} />

              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AddProduct />} />
                <Route path="products/:id/edit" element={<EditProduct />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

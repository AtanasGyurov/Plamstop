import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { CartProvider } from "./cart/CartContext";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contacts from "./pages/Contacts";
import Certificates from "./pages/Certificates";
import Partners from "./pages/Partners";

import AuthPage from "./auth/AuthPage";
import MyOrders from "./pages/MyOrders";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminOrders from "./admin/AdminOrders";

import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />

              {/* ✅ FIX: /contacts route exists */}
              <Route path="/contacts" element={<Contacts />} />

              {/* ✅ NEW pages */}
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/partners" element={<Partners />} />

              <Route path="/auth/*" element={<AuthPage />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Route>
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/checkout/cancel" element={<CheckoutCancel />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AddProduct />} />
              <Route path="products/:id/edit" element={<EditProduct />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

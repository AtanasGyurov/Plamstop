import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  createOrder,
  fetchAdminOrders,
  syncUserProfile,
  fetchMe,
} from "./api";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { AdminOrders } from "./components/AdminOrders";

import { auth } from "./firebaseClient";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken,
} from "firebase/auth";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState("");

  // checkout form state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [note, setNote] = useState("");

  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  // admin
  const [adminOrders, setAdminOrders] = useState([]);
  const [loadingAdminOrders, setLoadingAdminOrders] = useState(false);

  const [activeTab, setActiveTab] = useState("shop"); // "shop" | "admin"

  // auth
  const [currentUser, setCurrentUser] = useState(null);
  const [idToken, setIdToken] = useState("");
  const [userRole, setUserRole] = useState("guest"); // guest | client | admin
  const [authLoading, setAuthLoading] = useState(true);

  // login/register form state
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"

  // Load products on start
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoadingProducts(false);
      }
    }
    load();
  }, []);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthLoading(true);
      try {
        setCurrentUser(user);
        if (user) {
          const token = await getIdToken(user);
          setIdToken(token);

          // sync user profile in backend (users collection)
          await syncUserProfile(token);

          // fetch role
          const me = await fetchMe(token);
          setUserRole(me.role || "client");
        } else {
          setIdToken("");
          setUserRole("guest");
        }
      } catch (err) {
        console.error("Auth state error:", err);
        setError("Authentication error.");
        setUserRole("guest");
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Cart actions
  function handleAddToCart(product) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function handleChangeQty(id, qty) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  }

  function handleRemoveFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function handleClearCart() {
    setCart([]);
  }

  // Submit order
  async function handleSubmitOrder(e) {
    e.preventDefault();
    setOrderMessage("");
    setError("");

    if (!cart.length) {
      setError("Cart is empty.");
      return;
    }
    if (!customerName || !customerEmail) {
      setError("Name and email are required.");
      return;
    }

    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      customerName,
      customerEmail,
      customerAddress,
      note,
      items,
    };

    try {
      setSubmittingOrder(true);
      const created = await createOrder(orderData);
      console.log("Order created:", created);
      setOrderMessage(`Order created with id: ${created.id}`);
      setCart([]);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerAddress("");
      setNote("");
    } catch (err) {
      console.error(err);
      setError("Failed to create order.");
    } finally {
      setSubmittingOrder(false);
    }
  }

  // Load admin orders (requires admin + token)
  async function handleLoadAdminOrders() {
    setLoadingAdminOrders(true);
    setError("");
    try {
      if (!idToken) {
        throw new Error("No auth token");
      }
      const orders = await fetchAdminOrders(idToken);
      setAdminOrders(orders);
    } catch (err) {
      console.error(err);
      setError("Failed to load admin orders.");
    } finally {
      setLoadingAdminOrders(false);
    }
  }

  // Auth handlers
  async function handleAuthSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
      } else {
        await createUserWithEmailAndPassword(auth, authEmail, authPassword);
      }
      setAuthEmail("");
      setAuthPassword("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Authentication failed.");
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
      setError("Failed to log out.");
    }
  }

  // UI
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem" }}>
      <h1>Plamstop 🔥</h1>
      <p>Fire-safety shop – functionality first, auth + roles enabled.</p>

      {/* Auth section */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Authentication</h2>
        {authLoading ? (
          <p>Checking auth…</p>
        ) : currentUser ? (
          <div>
            <p>
              Logged in as <strong>{currentUser.email}</strong> (role:{" "}
              <strong>{userRole}</strong>)
            </p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <form onSubmit={handleAuthSubmit}>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </label>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <button type="submit">
                {authMode === "login" ? "Log in" : "Register"}
              </button>
              <button
                type="button"
                style={{ marginLeft: "0.5rem" }}
                onClick={() =>
                  setAuthMode((m) => (m === "login" ? "register" : "login"))
                }
              >
                Switch to {authMode === "login" ? "Register" : "Log in"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setActiveTab("shop")}
          disabled={activeTab === "shop"}
        >
          Shop
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          style={{ marginLeft: "0.5rem" }}
          disabled={activeTab === "admin" || userRole !== "admin"}
          title={
            userRole !== "admin"
              ? "Admin tab is only for admin role"
              : "Admin panel"
          }
        >
          Admin
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {orderMessage && <p style={{ color: "green" }}>{orderMessage}</p>}

      {activeTab === "shop" && (
        <>
          {loadingProducts ? (
            <p>Loading products…</p>
          ) : (
            <ProductList products={products} onAddToCart={handleAddToCart} />
          )}

          <Cart
            items={cart}
            onChangeQty={handleChangeQty}
            onRemove={handleRemoveFromCart}
            onClear={handleClearCart}
          />

          <div style={{ marginTop: "2rem" }}>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmitOrder}>
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Address:
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Note:
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </label>
              </div>
              <button type="submit" disabled={submittingOrder}>
                {submittingOrder ? "Submitting…" : "Place order"}
              </button>
            </form>
          </div>
        </>
      )}

      {activeTab === "admin" && userRole === "admin" && (
        <>
          <button onClick={handleLoadAdminOrders} disabled={loadingAdminOrders}>
            {loadingAdminOrders ? "Loading…" : "Load orders"}
          </button>
          <AdminOrders orders={adminOrders} />
        </>
      )}
    </div>
  );
}

export default App;

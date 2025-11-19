import React, { useEffect, useState } from "react";
import { fetchProducts, createOrder, fetchAdminOrders } from "./api";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { AdminOrders } from "./components/AdminOrders";

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

  // Load admin orders
  async function handleLoadAdminOrders() {
    setLoadingAdminOrders(true);
    setError("");
    try {
      const orders = await fetchAdminOrders();
      setAdminOrders(orders);
    } catch (err) {
      console.error(err);
      setError("Failed to load admin orders.");
    } finally {
      setLoadingAdminOrders(false);
    }
  }

  // UI
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem" }}>
      <h1>Plamstop 🔥</h1>
      <p>Basic fire-safety shop demo – functionality first, no design.</p>

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
          disabled={activeTab === "admin"}
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

      {activeTab === "admin" && (
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

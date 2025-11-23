// client/src/pages/Shop.jsx

import { useEffect, useState } from "react";
import { api } from "../api";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { auth } from "../firebaseClient";

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Checkout fields
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [note, setNote] = useState("");
  const [orderMsg, setOrderMsg] = useState("");

  // Load products from backend
  useEffect(() => {
    async function load() {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Cart actions
  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function updateQty(id, qty) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  // Send order
  async function handleOrderSubmit(e) {
    e.preventDefault();
    setError("");
    setOrderMsg("");

    if (!cart.length) {
      setError("Cart is empty.");
      return;
    }
    if (!customerName || !customerEmail) {
      setError("Name and email are required.");
      return;
    }

    try {
      const payload = {
        customerName,
        customerEmail,
        customerAddress,
        note,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const created = await api.createOrder(payload);
      setOrderMsg("Order created with ID: " + created.id);

      clearCart();
      setCustomerName("");
      setCustomerEmail("");
      setCustomerAddress("");
      setNote("");
    } catch (err) {
      console.error(err);
      setError("Failed to create order.");
    }
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Plamstop 🔥</h1>
      <p>Fire-safety shop</p>

      {loading && <p>Loading products…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orderMsg && <p style={{ color: "green" }}>{orderMsg}</p>}

      <ProductList products={products} onAddToCart={addToCart} />

      <Cart
        items={cart}
        onChangeQty={updateQty}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <h2>Checkout</h2>
      <form onSubmit={handleOrderSubmit}>
        <div>
          <label>Name:</label>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
        </div>

        <div>
          <label>Note:</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "0.5rem" }}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Shop;

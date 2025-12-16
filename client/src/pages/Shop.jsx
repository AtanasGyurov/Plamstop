import { useEffect, useState } from "react";
import api from "../api";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { useAuth } from "../auth/AuthContext";

function Shop() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Полета за поръчка
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [note, setNote] = useState("");
  const [orderMsg, setOrderMsg] = useState("");

  // ако е логнат — заключи имейла към акаунта
  useEffect(() => {
    if (user?.email) setCustomerEmail(user.email);
  }, [user]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Неуспешно зареждане на продуктите.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function addToCart(product) {
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

  function updateQty(id, qty) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  async function handleOrderSubmit(e) {
    e.preventDefault();
    setError("");
    setOrderMsg("");

    if (cart.length === 0) {
      setError("Количката е празна.");
      return;
    }

    const finalEmail = user?.email || customerEmail;

    if (!customerName) {
  setError("Името е задължително.");
  return;
}

    const payload = {
      customerName,

      customerAddress,
      note,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    try {
      const res = await api.post("/orders", payload);
      if (res.data?.id) {
        setOrderMsg("Поръчката е създадена успешно. № " + res.data.id);
        clearCart();
        setCustomerName("");
        if (!user?.email) setCustomerEmail("");
        setCustomerAddress("");
        setNote("");
      } else {
        setError("Поръчката не беше създадена.");
      }
    } catch (err) {
      console.error(err);
      setError("Грешка при създаване на поръчка.");
    }
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Plamstop 🔥</h1>
      <p>Магазин за пожарна безопасност</p>

      {loading && <p>Зареждане на продукти…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orderMsg && <p style={{ color: "green" }}>{orderMsg}</p>}

      <ProductList products={products} onAddToCart={addToCart} />

      <Cart
        items={cart}
        onChangeQty={updateQty}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <h2>Завършване на поръчка</h2>
      <form onSubmit={handleOrderSubmit}>
        <label>Име:</label>
        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

        <label>Имейл:</label>
        <input
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          disabled={!!user?.email}
        />

        <label>Адрес:</label>
        <input
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />

        <label>Бележка:</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />

        <button type="submit" style={{ marginTop: "0.5rem" }}>
          Направи поръчка
        </button>
      </form>
    </div>
  );
}

export default Shop;

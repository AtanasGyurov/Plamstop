import { useEffect, useMemo, useState } from "react";
import api from "../api";
import Cart from "../components/Cart";
import { useCart } from "./CartContext";

export default function CartDrawer({ open, onClose, defaultEmail, defaultName }) {
  const { items, updateQty, removeFromCart, clearCart, totalAmount } = useCart();

  const [step, setStep] = useState("cart"); // "cart" | "checkout"
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [customerName, setCustomerName] = useState(defaultName || "");
  const [customerEmail, setCustomerEmail] = useState(defaultEmail || "");
  const [customerAddress, setCustomerAddress] = useState("");
  const [note, setNote] = useState("");

  const canCheckout = useMemo(() => items.length > 0, [items]);

  const fmt = (n) => Number(n || 0).toFixed(2);
  const round2 = (n) => Math.round((Number(n || 0) + Number.EPSILON) * 100) / 100;

  // ✅ keep email synced, BUT don't overwrite if user already typed something
  useEffect(() => {
    setCustomerEmail((prev) => (prev?.trim() ? prev : defaultEmail || ""));
  }, [defaultEmail]);

  // ✅ keep name synced, BUT don't overwrite if user already typed something
  useEffect(() => {
    setCustomerName((prev) => (prev?.trim() ? prev : defaultName || ""));
  }, [defaultName]);

  // reset messages when opened
  useEffect(() => {
    if (open) {
      setError("");
      setMsg("");
      setStep("cart");

      // ✅ if fields are empty when opening, prefill them
      setCustomerEmail((prev) => (prev?.trim() ? prev : defaultEmail || ""));
      setCustomerName((prev) => (prev?.trim() ? prev : defaultName || ""));
    }
  }, [open, defaultEmail, defaultName]);

  if (!open) return null;

  async function submitOrder(e) {
    e.preventDefault();
    setError("");
    setMsg("");

    if (items.length === 0) return setError("Количката е празна.");
    if (!customerName?.trim() || !customerEmail?.trim()) {
      return setError("Името и имейлът са задължителни.");
    }

    const payload = {
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerAddress,
      note,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: round2(item.price),
        quantity: Number(item.quantity),
        total: round2(Number(item.price) * Number(item.quantity)),
      })),
      totalAmount: round2(totalAmount),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post("/orders", payload);
      if (res.data?.id) {
        setMsg("Поръчката е създадена успешно. № " + res.data.id);
        clearCart();

        // reset form but keep defaults
        setCustomerName(defaultName || "");
        setCustomerEmail(defaultEmail || "");
        setCustomerAddress("");
        setNote("");
        setStep("cart");
      } else {
        setError("Поръчката не беше създадена.");
      }
    } catch (err) {
      console.error(err);
      setError("Грешка при създаване на поръчка.");
    }
  }

  return (
    <div className="drawerOverlay" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawerHeader">
          <strong>{step === "cart" ? "Количка" : "Завършване на поръчка"}</strong>
          <button type="button" className="navBtn" onClick={onClose}>
            ✕
          </button>
        </div>

        {msg && <div className="alert success">{msg}</div>}
        {error && <div className="alert error">{error}</div>}

        {step === "cart" ? (
          <>
            <Cart
              items={items}
              onChangeQty={updateQty}
              onRemove={removeFromCart}
              onClear={clearCart}
            />

            <div className="drawerFooter">
              <div className="totalRow">
                <span>Общо:</span>
                <strong>{fmt(totalAmount)} евро</strong>
              </div>

              <button
                type="button"
                className="navBtn accent"
                disabled={!canCheckout}
                onClick={() => setStep("checkout")}
                style={{
                  opacity: canCheckout ? 1 : 0.5,
                  cursor: canCheckout ? "pointer" : "not-allowed",
                }}
              >
                Към поръчка →
              </button>
            </div>
          </>
        ) : (
          <form className="form" onSubmit={submitOrder}>
            <label>Име</label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Вашето име"
            />

            <label>Имейл</label>
            <input
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="example@email.com"
            />

            <label>Адрес</label>
            <input
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />

            <label>Бележка</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} />

            <div className="drawerFooter row">
              <button
                type="button"
                className="navBtn"
                onClick={() => setStep("cart")}
              >
                ← Назад
              </button>
              <button type="submit" className="navBtn accent">
                Направи поръчка
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}

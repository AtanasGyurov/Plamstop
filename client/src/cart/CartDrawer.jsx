import { useEffect, useMemo, useState } from "react";
import api from "../api";
import Cart from "../components/Cart";
import { useCart } from "./CartContext";

export default function CartDrawer({ open, onClose, defaultEmail, defaultName }) {
  const { items, updateQty, removeFromCart, clearCart, totalAmount } = useCart();

  const [step, setStep] = useState("cart"); // "cart" | "checkout"
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [payLoading, setPayLoading] = useState(false);

  const [customerName, setCustomerName] = useState(defaultName || "");
  const [customerEmail, setCustomerEmail] = useState(defaultEmail || "");
  const [customerAddress, setCustomerAddress] = useState("");
  const [note, setNote] = useState("");

  const canCheckout = useMemo(() => items.length > 0, [items]);

  const fmt = (n) => Number(n || 0).toFixed(2);
  const round2 = (n) => Math.round((Number(n || 0) + Number.EPSILON) * 100) / 100;

  // keep email synced, but don't overwrite typed value
  useEffect(() => {
    setCustomerEmail((prev) => (prev?.trim() ? prev : defaultEmail || ""));
  }, [defaultEmail]);

  // keep name synced, but don't overwrite typed value
  useEffect(() => {
    setCustomerName((prev) => (prev?.trim() ? prev : defaultName || ""));
  }, [defaultName]);

  // reset messages when opened
  useEffect(() => {
    if (open) {
      setError("");
      setMsg("");
      setStep("cart");
      setPayLoading(false);

      setCustomerEmail((prev) => (prev?.trim() ? prev : defaultEmail || ""));
      setCustomerName((prev) => (prev?.trim() ? prev : defaultName || ""));
    }
  }, [open, defaultEmail, defaultName]);

  if (!open) return null;

  function validateCheckoutFields() {
    if (items.length === 0) return "Количката е празна.";
    if (!customerName?.trim() || !customerEmail?.trim()) return "Името и имейлът са задължителни.";
    if (!customerAddress?.trim()) return "Адресът е задължителен за плащане.";
    return "";
  }

  async function startStripePayment() {
    setError("");
    setMsg("");

    const v = validateCheckoutFields();
    if (v) return setError(v);

    try {
      setPayLoading(true);

      const payload = {
        customer: {
          name: customerName.trim(),
          email: customerEmail.trim(),
          address: customerAddress.trim(),
          note: note?.trim() || "",
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: round2(item.price),
          quantity: Number(item.quantity),
        })),
        totalAmount: round2(totalAmount),
      };

      // ✅ IMPORTANT: POST, not GET
      const res = await api.post("/stripe/create-checkout-session", payload);
      
      const url = res.data?.url;
      if (!url) throw new Error("Missing session url");

      // ✅ Redirect to Stripe Checkout (test mode)
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError("Грешка при стартиране на Stripe плащане.");
    } finally {
      setPayLoading(false);
    }
  }

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
              placeholder="ул., номер, град"
            />

            <label>Бележка</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} />

            {/* ✅ Stripe button AFTER address step */}
            <button
              type="button"
              className="navBtn"
              onClick={startStripePayment}
              disabled={payLoading}
              style={{
                marginTop: 10,
                opacity: payLoading ? 0.6 : 1,
                cursor: payLoading ? "not-allowed" : "pointer",
              }}
            >
              {payLoading ? "Отварям Stripe..." : "Плати с карта (Stripe test)"}
            </button>

            <div className="muted" style={{ marginTop: 10, fontSize: 12, lineHeight: 1.5 }}>
              * Stripe е в тестов режим (примерна покупка). Използвай карта 4242 4242 4242 4242,
              произволна бъдеща дата и CVC.
            </div>

            <div className="drawerFooter row">
              <button type="button" className="navBtn" onClick={() => setStep("cart")}>
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

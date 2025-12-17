import { useMemo, useState } from "react";
import api from "../api";
import Cart from "../components/Cart";
import { useCart } from "./CartContext";

export default function CartDrawer({ open, onClose, defaultEmail }) {
  const { items, updateQty, removeFromCart, clearCart, totalAmount } = useCart();
  const [step, setStep] = useState("cart"); // "cart" | "checkout"
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState(defaultEmail || "");
  const [customerAddress, setCustomerAddress] = useState("");
  const [note, setNote] = useState("");

  const canCheckout = useMemo(() => items.length > 0, [items]);

  if (!open) return null;

  async function submitOrder(e) {
    e.preventDefault();
    setError("");
    setMsg("");

    if (items.length === 0) return setError("Количката е празна.");
    if (!customerName || !customerEmail) return setError("Името и имейлът са задължителни.");

    const payload = {
      customerName,
      customerEmail,
      customerAddress,
      note,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: Number(item.price) * Number(item.quantity),
      })),
      totalAmount,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post("/orders", payload);
      if (res.data?.id) {
        setMsg("Поръчката е създадена успешно. № " + res.data.id);
        clearCart();
        setCustomerName("");
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
          <button className="btn btnGhost" onClick={onClose}>✕</button>
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
                <strong>{Number(totalAmount).toFixed(2)} лв</strong>
              </div>

              <button
                className="btn btnPrimary"
                disabled={!canCheckout}
                onClick={() => setStep("checkout")}
              >
                Към поръчка →
              </button>
            </div>
          </>
        ) : (
          <>
            <form className="form" onSubmit={submitOrder}>
              <label>Име</label>
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

              <label>Имейл</label>
              <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />

              <label>Адрес</label>
              <input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />

              <label>Бележка</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />

              <div className="drawerFooter">
                <button type="button" className="btn btnGhost" onClick={() => setStep("cart")}>
                  ← Назад
                </button>
                <button type="submit" className="btn btnPrimary">
                  Направи поръчка
                </button>
              </div>
            </form>
          </>
        )}
      </aside>
    </div>
  );
}

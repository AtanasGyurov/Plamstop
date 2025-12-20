import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToCart(product) {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function updateQty(id, qty) {
    const q = Number(qty);
    if (!Number.isFinite(q)) return;
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: q } : p)));
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0),
    [items]
  );

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0),
        0
      ),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      setItems,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      totalQty,
      totalAmount,
    }),
    [items, totalQty, totalAmount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

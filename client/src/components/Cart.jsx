import React from "react";

export function Cart({ items, onChangeQty, onRemove, onClear }) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: "0.5rem" }}>
                <strong>{item.name}</strong> – {item.price} лв. ×{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    onChangeQty(item.id, Math.max(1, Number(e.target.value)))
                  }
                  style={{ width: "3rem" }}
                />
                <span style={{ marginLeft: "0.5rem" }}>
                  = {item.price * item.quantity} лв.
                </span>
                <button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total:</strong> {total} лв.
          </p>
          <button onClick={onClear}>Clear cart</button>
        </>
      )}
    </div>
  );
}

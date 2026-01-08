import React from "react";

function Cart({ items, onChangeQty, onRemove, onClear }) {
  const fmt = (n) => Number(n || 0).toFixed(2);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h2>Количка</h2>

      {items.length === 0 ? (
        <p>Количката е празна.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => {
              const price = Number(item.price);
              const qty = Number(item.quantity);
              const lineTotal = price * qty;

              return (
                <li key={item.id} style={{ marginBottom: "0.5rem" }}>
                  <strong>{item.name}</strong> – {fmt(price)} евро ×{" "}
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) =>
                      onChangeQty(item.id, Math.max(1, Number(e.target.value)))
                    }
                    style={{ width: "3rem" }}
                  />
                  <span style={{ marginLeft: "0.5rem" }}>
                    = {fmt(lineTotal)} евро.
                  </span>

                  <button
                    style={{ marginLeft: "0.5rem" }}
                    onClick={() => onRemove(item.id)}
                  >
                    Премахни
                  </button>
                </li>
              );
            })}
          </ul>

          <p>
            <strong>Общо:</strong> {fmt(total)} евро.
          </p>

          <button onClick={onClear}>Изчисти количката</button>
        </>
      )}
    </div>
  );
}

export default Cart;

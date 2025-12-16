import React from "react";

function Cart({ items, onChangeQty, onRemove, onClear }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h2>Количка</h2>
      {items.length === 0 ? (
        <p>Количката е празна.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: "0.5rem" }}>
                <strong>{item.name}</strong> – {item.price} лв ×{" "}
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
                  Премахни
                </button>
              </li>
            ))}
          </ul>

          <p>
            <strong>Общо:</strong> {total} лв.
          </p>

          <button onClick={onClear}>Изчисти количката</button>
        </>
      )}
    </div>
  );
}

export default Cart;

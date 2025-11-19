import React from "react";

export function AdminOrders({ orders }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Admin – Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((o) => (
            <li
              key={o.id}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                padding: "0.5rem",
              }}
            >
              <div>
                <strong>{o.customerName}</strong> ({o.customerEmail})
              </div>
              <div>Address: {o.customerAddress || "-"}</div>
              <div>Status: {o.status}</div>
              <div>
                Items:{" "}
                {o.items?.map((it, idx) => (
                  <span key={idx}>
                    {idx > 0 && ", "}
                    {it.productId} × {it.quantity}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import React from "react";

export function ProductList({ products, onAddToCart }) {
  if (!products.length) {
    return <p>No products yet.</p>;
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{p.name}</strong> – {p.price} лв.
            {p.category && <> ({p.category})</>}
            {typeof p.stock === "number" && <> | stock: {p.stock}</>}
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onAddToCart(p)}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

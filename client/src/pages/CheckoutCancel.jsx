import { Link } from "react-router-dom";

export default function CheckoutCancel() {
  return (
    <div className="container">
      <h1>Плащането е отказано</h1>
      <p className="muted">Можете да опитате отново.</p>

      <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
        <Link to="/shop" className="navBtn accent">Назад към магазина</Link>
      </div>
    </div>
  );
}

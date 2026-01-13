import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [ok] = useState(true);

  useEffect(() => {
    // Optional: you can call backend to verify session
    // for showcase we just display success
  }, [sessionId]);

  return (
    <div className="container">
      <h1>Плащането е успешно ✅</h1>
      <p className="muted">Session: {sessionId || "(няма)"} </p>

      <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
        <Link to="/shop" className="navBtn accent">Към магазина</Link>
        <Link to="/my-orders" className="navBtn">Моите поръчки</Link>
      </div>
    </div>
  );
}

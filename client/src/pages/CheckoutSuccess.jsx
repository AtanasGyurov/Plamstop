import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    async function confirm() {
      if (!sessionId) {
        setMsg("Липсва session_id. Поръчката не може да бъде потвърдена.");
        setLoading(false);
        return;
      }

      try {
        const res = await api.post("/stripe/confirm", { sessionId });
        const created = res.data?.created;
        const order = res.data?.order;

        setOrderId(order?.id || "");
        setMsg(created ? "Поръчката е записана ✅" : "Поръчката вече е записана ✅");
      } catch (err) {
        console.error("Confirm session error:", err);

        const status = err?.response?.status;
        const serverMsg = err?.response?.data?.error;

        setMsg(
          `Плащането е успешно, но поръчката не беше записана. ` +
            `(HTTP ${status || "?"}) ${serverMsg ? "— " + serverMsg : ""}`
        );
      } finally {
        setLoading(false);
      }
    }

    confirm();
  }, [sessionId]);

  return (
    <div className="container">
      <h1>Плащането е успешно ✅</h1>

      <p className="muted">
        Session: {sessionId || "(няма)"}
        {orderId ? (
          <>
            <br />
            Order: {orderId}
          </>
        ) : null}
      </p>

      {loading ? <p className="muted">Записване на поръчката…</p> : <p className="muted">{msg}</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
        <Link to="/shop" className="navBtn accent">
          Към магазина
        </Link>
        <Link to="/my-orders" className="navBtn">
          Моите поръчки
        </Link>
      </div>
    </div>
  );
}
export default function AdminDashboard() {
  return (
    <div className="container">
      <h1 className="pageTitle">Админ табло</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        Добре дошли в административния панел на Plamstop. Оттук управлявате
        продуктите, поръчките и съдържанието на онлайн магазина.
      </p>

      {/* WHAT YOU CAN DO */}
      <section style={{ marginTop: 20 }}>
        <h2 style={{ marginBottom: 14 }}>Какво можете да правите тук</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {/* PRODUCTS */}
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{ marginBottom: 8 }}>📦 Управление на продукти</h3>
            <p className="muted">
              Добавяйте нови продукти, редактирайте цени, наличности и описания,
              или премахвайте артикули от магазина.
            </p>
          </div>

          {/* ORDERS */}
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{ marginBottom: 8 }}>🧾 Управление на поръчки</h3>
            <p className="muted">
              Преглеждайте клиентски поръчки, проверявайте детайли, суми и статус
              на изпълнение в реално време.
            </p>
          </div>

          {/* SECURITY */}
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{ marginBottom: 8 }}>🔐 Контрол и сигурност</h3>
            <p className="muted">
              Административният достъп е защитен чрез роли и вход. Само
              оторизирани потребители имат достъп до тези функции.
            </p>
          </div>
        </div>
      </section>

      {/* TIP */}
      <div
        style={{
          marginTop: 28,
          padding: 18,
          borderRadius: 16,
          border: "1px solid rgba(255,122,24,0.35)",
          background: "rgba(255,122,24,0.12)",
        }}
      >
        <strong>Съвет:</strong>{" "}
        <span className="muted">
          Използвайте навигацията горе, за да превключвате бързо между продуктите
          и поръчките.
        </span>
      </div>
    </div>
  );
}

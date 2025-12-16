export default function Contact() {
  return (
    <div style={{ padding: "2rem", maxWidth: 950 }}>
      <h1>Контакти</h1>

      <div
        style={{
          marginTop: "1rem",
          border: "1px solid #2b2b2b",
          background: "#151515",
          borderRadius: 12,
          padding: "1rem",
        }}
      >
        <p style={{ margin: 0, lineHeight: 1.8 }}>
          <strong>Имейл:</strong> office@plamstop.bg<br />
          <strong>Телефон:</strong> +359 88 888 8888<br />
          <strong>Работно време:</strong> Пон–Пет, 09:00–18:00
        </p>
      </div>

      <p style={{ marginTop: "1rem", opacity: 0.85 }}>
        (По-късно можем да добавим контактна форма и карта.)
      </p>
    </div>
  );
}

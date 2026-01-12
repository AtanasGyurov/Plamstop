// client/src/pages/Certificates.jsx
export default function Certificates() {
  const certificates = [
    {
      id: 1,
      title: "Удостоверение – КИИППБ",
      description:
        "Удостоверение за членство в Камарата на инженерите в инвестиционното проектиране по пожарна безопасност.",
      image: "/images/certificates/c3501525.jpg",
    },
    {
      id: 2,
      title: "Регистрационно удостоверение",
      description:
        "Регистрация и професионална квалификация в сферата на пожарната безопасност.",
      image: "/images/certificates/c3501522.jpg",
    },
    {
      id: 3,
      title: "Разрешение за пожарогасителна дейност",
      description:
        "Разрешение от МВР – Главна дирекция „Пожарна безопасност и защита на населението“.",
      image: "/images/certificates/c3501523.jpg",
    },
  ];

  return (
    <div className="container">
      <h1 style={{ marginBottom: 8 }}>Сертификати и разрешителни</h1>
      <p className="muted" style={{ maxWidth: 720 }}>
        Plamstop притежава всички необходими удостоверения, разрешителни и
        професионални регистрации за извършване на дейности в сферата на
        пожарната безопасност.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        {certificates.map((c) => (
          <article
            key={c.id}
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: 220,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={c.image}
                alt={c.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div style={{ padding: 14 }}>
              <h3 style={{ margin: "0 0 6px" }}>{c.title}</h3>
              <p className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>
                {c.description}
              </p>

              <a
                href={c.image}
                target="_blank"
                rel="noopener noreferrer"
                className="navBtn"
                style={{ marginTop: 10, display: "inline-flex" }}
              >
                Преглед в пълен размер
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

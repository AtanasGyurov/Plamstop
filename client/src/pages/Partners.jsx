// client/src/pages/Partners.jsx
export default function Partners() {
  const partners = [
    {
      name: "Березка",
      logo: "/images/partners/berezka.jpg",
      desc: "Обект/партньор, за който могат да се доставят и поддържат решения за пожарна безопасност – обозначения, пожарогасители и базово оборудване.",
    },
    {
      name: "EVN",
      logo: "/images/partners/evn.jpg",
      desc: "Енергийна компания с високи изисквания за безопасност в административни и технически обекти – сигнализация, евакуационни табели и аварийно осветление.",
    },
    {
      name: "Театър „Иван Вазов“",
      logo: "/images/partners/ivan_vazov.jpg",
      desc: "Обществена сграда с поток от посетители – важни са ясни евакуационни обозначения, планове, аварийно осветление и поддържано оборудване.",
    },
    {
      name: "KCM (КЦМ)",
      logo: "/images/partners/kcm.jpg",
      desc: "Индустриален партньор – решения за производствени и складови зони: пожарогасители, хидранти/маркучи, табели и планове според риска на обекта.",
    },
    {
      name: "Orion",
      logo: "/images/partners/orion.jpg",
      desc: "Партньор/обект с нужда от систематизиран подход към безопасността – продуктови решения и консултация за избор спрямо среда и натоварване.",
    },
    {
      name: "SMID",
      logo: "/images/partners/simid.jpg",
      desc: "Строителен/инженерен партньор – интеграция на пожарна безопасност при проекти: планове, обозначения, аварийно осветление и системи.",
    },
    {
      name: "Verdi Sign",
      logo: "/images/partners/verdi_sign.jpg",
      desc: "Марка/партньор за професионални табели и обозначения – евакуационни знаци, фотолуминесцентни решения и маркировки за обекти.",
    },
    {
      name: "Водстрой",
      logo: "/images/partners/vodstroi.jpg",
      desc: "Строителна/инфраструктурна компания – решения за безопасност на обекти и бази: пожарогасители, табели, аварийно осветление и планове.",
    },
  ];

  const card = {
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 16,
    overflow: "hidden",
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    padding: 14,
    display: "grid",
    gap: 12,
    textAlign: "center",
  };

  const logoBox = {
    height: 90,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,122,24,0.14))",
    border: "1px solid rgba(255,255,255,0.10)",
    padding: 10,
    overflow: "hidden",
  };

  return (
    <div className="container">
      <h1 className="pageTitle">Партньори и марки</h1>
      <p className="muted">
        Част от компании/обекти и партньори, с които работим или за които можем да
        предложим решения за пожарна безопасност в рамките на проекта (showcase).
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
          marginTop: 18,
        }}
      >
        {partners.map((p) => (
          <article key={p.name} style={card}>
            <div style={logoBox}>
              <img
                src={p.logo}
                alt={p.name}
                style={{
                  maxHeight: 70,
                  maxWidth: "100%",
                  objectFit: "contain",
                  opacity: 0.95,
                }}
                onError={(e) => {
                  // if missing file, just hide the image (card still looks good)
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div style={{ fontWeight: 900, fontSize: 16 }}>{p.name}</div>

            <div
              className="muted"
              style={{ fontSize: 14, lineHeight: 1.6 }}
            >
              {p.desc}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

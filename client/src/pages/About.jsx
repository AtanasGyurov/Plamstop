export default function About() {
  return (
    <div className="container">
      <h1 className="pageTitle" style={{ fontSize: 44 }}>За нас</h1>

      <div className="card">
        <p className="lead" style={{ marginTop: 0 }}>
          Plamstop е фокусирана върху пожарната безопасност — от превенция до правилно
          оборудване и обучение. Целта ни е да предоставим надеждни решения и качествени
          продукти на достъпни цени.
        </p>

        <h2 style={{ marginTop: 18 }}>Какво предлагаме</h2>
        <ul>
          <li>Пожарогасители и аксесоари</li>
          <li>Сигнализация и датчици</li>
          <li>Маркировки и евакуационни решения</li>
          <li>Консултации и внедряване</li>
        </ul>

        <h2 style={{ marginTop: 18 }}>Контакт</h2>
        <p className="lead" style={{ marginBottom: 0 }}>
          Ако искаш, ще добавим отделна страница „Контакти“ (форма + карта) по-късно.
        </p>
      </div>
    </div>
  );
}
  
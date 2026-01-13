import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <div className="container">
        {/* HERO */}
        <section
          style={{
            display: "grid",
            gap: 28,
            padding: "28px 0 36px",
            alignItems: "center",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 20,
              padding: 26,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,122,24,0.08))",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ maxWidth: 680 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid rgba(255,122,24,0.45)",
                  borderRadius: 999,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Инженеринг, проектиране и доставки за пожарна безопасност
              </div>

              <h1 style={{ margin: "14px 0 0", fontSize: 38, fontWeight: 900 }}>
                Plamstop{" "}
                <img
                  className="inlineLogo"
                  src="/images/logo.png"
                  alt="Лого на Plamstop"
                />
              </h1>

              <p className="muted" style={{ marginTop: 12, lineHeight: 1.7 }}>
                Осигуряваме пълно решение за пожарна безопасност: онлайн магазин
                с оборудване и консумативи, детайлни евакуационни планове за вашата
                сграда и проектиране на системи за пожароизвестяване. Работим с
                офиси, търговски и индустриални обекти, като гарантираме съответствие
                с нормативните изисквания и готовност за проверки.
              </p>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                  marginTop: 16,
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 600,
                }}
              >
                <div>Доставка и поддръжка на оборудване</div>
                <div>Евакуационни планове, табели и инструкции</div>
                <div>Пожароизвестяване и системи за оповестяване</div>
              </div>

              <div
                style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}
              >
                <Link to="/shop" className="navBtn accent">
                  Към магазина
                </Link>
                <Link to="/contacts" className="navBtn">
                  Заяви за консултация
                </Link>
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: 20,
              border: "none",
              background: "transparent",
              minHeight: 280,
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              padding: 0,
            }}
          >
            <img
              src="/images/team_picture.jpg"
              alt="Екипът на Plamstop"
              style={{
                width: "100%",
                maxHeight: 320,
                objectFit: "cover",
                borderRadius: 16,
                border: "none",
              }}
            />
          </div>
        </section>

        {/* TRUST BAR */}
        <section
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            marginBottom: 30,
          }}
        >
          {[
            { label: "Бърза реакция и планиране", value: "Ясни процедури 24/7" },
            { label: "Сертифицирани инженери", value: "Проектиране по норматив" },
            { label: "Магазин с пълен асортимент", value: "Пожарогасители, датчици, PPE" },
            { label: "Евакуационни схеми", value: "Планове, табели и инструкции" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                padding: 16,
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ fontWeight: 800 }}>{item.label}</div>
              <div className="muted" style={{ marginTop: 6 }}>
                {item.value}
              </div>
            </div>
          ))}
        </section>

        {/* SERVICES */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ marginBottom: 12 }}>Един партньор за цялостна безопасност</h2>
          <p className="muted" style={{ maxWidth: 820, lineHeight: 1.6 }}>
            Поемаме целия процес: обследване на обекта, проектиране, доставки,
            монтаж, документация и периодични проверки. Можете да изберете отделна
            услуга или пакет за цялостна поддръжка.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
              marginTop: 18,
            }}
          >
            {[
              {
                title: "Магазин и доставки",
                image: "/images/categories/extinguishers.jpg",
                imageAlt: "Пожарогасители",
                points: [
                  "Пожарогасители, маркучи, хидранти, шкафове",
                  "Димни и температурни датчици, батерии, табели",
                  "PPE комплекти, аварийно осветление, резервни части",
                ],
              },
              {
                title: "Евакуационни планове",
                image: "/images/categories/evacuation-plans.jpg",
                imageAlt: "Евакуационни планове",
                points: [
                  "Персонализирани схеми и маршрути",
                  "Точки за сбор и достъпни маршрути",
                  "Обучение и инструкции за персонал",
                ],
              },
              {
                title: "Пожароизвестяване",
                image: "/images/categories/fire-alarm.jpg",
                imageAlt: "Пожароизвестяване",
                points: [
                  "Проектиране и монтаж на аларми",
                  "Конфигурация на панели и наблюдение",
                  "Тестове, поддръжка и протоколи",
                ],
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 18,
                  padding: 18,
                  background: "rgba(255,255,255,0.06)",
                  display: "grid",
                  gap: 12,
                }}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 14,
                  }}
                />
                <strong>{item.title}</strong>
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                  {item.points.map((point) => (
                    <li key={point} className="muted">
                      {point}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link to="/contacts" className="navBtn">
                    Заяви оферта
                  </Link>
                  <Link to="/shop" className="navBtn accent">
                    Продукти в магазина
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section style={{ marginBottom: 38 }}>
          <h2>Категории с продукти</h2>
          <p className="muted" style={{ maxWidth: 760 }}>
            Изградете комплект за вашия обект с основни и сертифицирани елементи.
            По заявка подготвяме пакет, съобразен с индустрията и риска.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
              marginTop: 16,
            }}
          >
            {[
              {
                label: "Преносими пожарогасители",
                image: "/images/categories/extinguishers.jpg",
                imageAlt: "Преносими пожарогасители",
              },
              {
                label: "Алармени панели и сирени",
                image: "/images/categories/alarm-panels.jpg",
                imageAlt: "Алармени панели и сирени",
              },
              {
                label: "Аварийно осветление",
                image: "/images/categories/emergency-lighting.jpg",
                imageAlt: "Аварийно осветление",
              },
              {
                label: "Хидранти и маркучи",
                image: "/images/categories/hydrants-hoses.jpg",
                imageAlt: "Хидранти и маркучи",
              },
              {
                label: "Евакуационни табели",
                image: "/images/categories/exit-signs.jpg",
                imageAlt: "Евакуационни табели",
              },
              {
                label: "Инструменти за инспекция",
                image: "/images/categories/inspection-tools.jpg",
                imageAlt: "Инструменти за инспекция",
              },
              ].map((item) => (
              <div
                key={item.label}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 16,
                  padding: 14,
                  background: "rgba(255,255,255,0.05)",
                  display: "grid",
                  gap: 10,
                }}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  style={{
                    width: "100%",
                    height: 110,
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
                <strong>{item.label}</strong>
                <div className="muted">Пакет или водеща марка</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section style={{ marginBottom: 36 }}>
          <h2>Как работим</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
              marginTop: 14,
            }}
          >
            {[
              {
                title: "1. Оглед на обекта",
                text:
                  "Анализираме рисковете, заетостта и наличното оборудване.",
              },
              {
                title: "2. Инженерен проект",
                text:
                  "Подготвяме евакуационни планове, схеми за известяване и документация.",
              },
              {
                title: "3. Монтаж и доставки",
                text:
                  "Инсталираме системи, доставяме техника и проверяваме покритието.",
              },
              {
                title: "4. Поддръжка и контрол",
                text:
                  "Планираме проверки, подменяме консумативи и водим протоколи.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 16,
                  padding: 16,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <strong>{item.title}</strong>
                <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CASE STUDY / IMAGE */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              minHeight: 220,
            }}
          >
            <img
              src="/images/categories/project-site.jpg"
              alt="?????? ?? ?????"
              style={{
                width: "100%",
                height: "100%",
                minHeight: 220,
                objectFit: "cover",
              }}
            />
          </div>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 18,
              padding: 20,
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <strong>Индустриален обект: обновяване на системите</strong>
            <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
              Препроектирахме евакуационните маршрути, внедрихме многозонова
              система за известяване и доставихме оборудване за пожарогасене
              за логистичен център от 20 000 кв. м. Обектът премина проверка
              от първи път и съкрати времето за реакция с 40%.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <Link to="/contacts" className="navBtn accent">
                Планирай проект
              </Link>
              <Link to="/certificates" className="navBtn">
                Виж сертификати
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 40 }}>
          <h2>Често задавани въпроси</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              marginTop: 14,
            }}
          >
            {[
              {
                q: "Изготвяте ли евакуационни планове по норматив?",
                a:
                  "Да. Нанасяме изходи, табели, пожарогасители и точки за сбор и предоставяме печатни и дигитални формати.",
              },
              {
                q: "Мога ли да поръчам оборудване онлайн?",
                a:
                  "Да. В магазина има сертифицирани продукти и можем да подготвим комплект за вашия тип обект.",
              },
              {
                q: "Поддържате ли системи за известяване?",
                a:
                  "Да. Проектираме, инсталираме и поддържаме системи за пожароизвестяване и оповестяване.",
              },
            ].map((item) => (
              <div
                key={item.q}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 16,
                  padding: 16,
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <strong>{item.q}</strong>
                <p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 26,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 18,
              padding: 22,
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>Готови ли сте да подсигурите обекта?</strong>
              <div className="muted" style={{ marginTop: 6 }}>
                Запишете оглед, заявете евакуационен план или поръчайте техника
                с бърза доставка.
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contacts" className="navBtn accent">
                Запази консултация
              </Link>
              <Link to="/shop" className="navBtn">
                Пазарувай техника
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

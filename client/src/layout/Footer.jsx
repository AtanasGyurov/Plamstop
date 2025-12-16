export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div>© {new Date().getFullYear()} Plamstop — Пожарна безопасност</div>
        <div className="footerHint">
          Цветова тема: <span className="chip">Черно</span> <span className="chip chipOrange">Оранжево</span>{" "}
          <span className="chip chipRed">Червено</span>
        </div>
      </div>
    </footer>
  );
}

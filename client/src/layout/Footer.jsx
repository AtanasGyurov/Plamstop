export default function Footer() {
  return (
    <footer className="footer">
      <div
        className="footerInner"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div>© {new Date().getFullYear()} Plamstop — Пожарна безопасност</div>
      </div>
    </footer>
  );
}

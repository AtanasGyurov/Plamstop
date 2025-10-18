export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="container" role="contentinfo"
      style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
      <span>© {year} PlamShop. All rights reserved.</span>
      <span>
        <a href="#" onClick={(e)=>e.preventDefault()}>Privacy</a> ·{" "}
        <a href="#" onClick={(e)=>e.preventDefault()}>Terms</a>
      </span>
    </div>
  );
}

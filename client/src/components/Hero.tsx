export default function Hero({ onShop }: { onShop: () => void }) {
  return (
    <section className="hero">
      <h1>MERN + TypeScript starter with a clean UI</h1>
      <p>Responsive layout and a ready slot for your shop.</p>
      <div className="cta">
        <button className="btn btn-primary" onClick={onShop}>Open Shop</button>
        <a className="btn" href="#" onClick={(e)=>e.preventDefault()}>Learn more</a>
      </div>
    </section>
  );
}

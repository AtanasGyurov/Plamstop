import { useEffect, useState } from "react";
import api from "../api";
import ProductList from "../components/ProductList";
import { useCart } from "../cart/CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Неуспешно зареждане на продуктите.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container">
      <h1 className="pageTitle">Plamstop 🔥</h1>
      <p className="muted">Магазин за пожарна безопасност</p>

      {loading && <p>Зареждане на продукти…</p>}
      {error && <p className="textError">{error}</p>}

      <ProductList products={products} onAddToCart={addToCart} />
    </div>
  );
}

export default Shop;

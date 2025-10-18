import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";

type Page = "home" | "about" | "shop" | "contact";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Navbar current={page} onNavigate={setPage} />
        </div>
      </nav>

      <main className="container">
        {page === "home"    && (<><Hero onShop={() => setPage("shop")} /><Home /></>)}
        {page === "about"   && <About />}
        {page === "shop"    && <Shop />}
        {page === "contact" && <Contact />}
      </main>

      <footer className="footer">
        <div className="container">
          <Footer />
        </div>
      </footer>
    </>
  );
}

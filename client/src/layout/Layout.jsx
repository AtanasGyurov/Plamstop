import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="appShell">
      <Navbar />
      <main className="appMain">{children}</main>
      <Footer />
    </div>
  );
}

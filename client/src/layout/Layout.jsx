// client/src/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="appShell">
      <Navbar />
      <main className="appMain">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

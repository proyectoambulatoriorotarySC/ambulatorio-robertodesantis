import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AvisoBanner from "./AvisoBanner";
import Header from "./Header";
import Footer from "./Footer";

const LayoutPublico = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="app-shell">
      <AvisoBanner />
      <Header />
      <main className="page-content" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPublico;

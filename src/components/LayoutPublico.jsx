import { Outlet, useLocation } from "react-router-dom";
import { useEffect, Suspense } from "react";
import AvisoBanner from "./AvisoBanner";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import LoadingSpinner from "./LoadingSpinner";

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
        <Suspense fallback={<LoadingSpinner message="Cargando contenido..." />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LayoutPublico;

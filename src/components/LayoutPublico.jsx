import { Outlet } from "react-router-dom";
import AvisoBanner from "./AvisoBanner";
import Header from "./Header";
import Footer from "./Footer";

const LayoutPublico = () => {
  return (
    <div className="app-shell">
      <AvisoBanner />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPublico;

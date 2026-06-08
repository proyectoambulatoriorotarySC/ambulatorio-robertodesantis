import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const navigationItems = [
  { label: "Inicio", to: "/" },
  { label: "Especialidades", to: "/especialidades" },
  { label: "Directorio Médico", to: "/directorio" },
  { label: "Servicios", to: "/servicios" },
  { label: "Nosotros", to: "/nosotros" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/">
          <span className="brand__mark" aria-hidden="true">AR</span>
          <span className="brand__copy">
            <strong>Ambulatorio Roberto De Santis</strong>
            <span>Rotary Club</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}>
          {navigationItems.map((item) => (
            <NavLink key={item.label} to={item.to} onClick={() => setMenuOpen(false)} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";

const navigationItems = [
  { label: "Especialidades", href: "/#especialidades" },
  { label: "Directorio Médico", href: "/#directorio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Nosotros", href: "/#nosotros" },
];

const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
  };

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
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}

          {user ? (
            <>
              <NavLink to="/admin" className="site-nav__action" onClick={() => setMenuOpen(false)}>
                Panel
              </NavLink>
              <button type="button" className="site-nav__logout" onClick={handleLogout}>
                Salir
              </button>
            </>
          ) : (
            <NavLink to="/login" className="site-nav__action" onClick={() => setMenuOpen(false)}>
              Acceso
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
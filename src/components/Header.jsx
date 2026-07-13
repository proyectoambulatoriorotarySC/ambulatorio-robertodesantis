import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";

const navigationItems = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Directorio Médico", to: "/directorio" },
  { label: "Consultas Integrales", to: "/integrales" },
  { label: "Servicios", to: "/servicios" },
  { label: "Galería", to: "/galeria" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleScroll = useCallback(() => {
    setCompact(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header className={`site-header ${compact ? "site-header--compact" : ""}`} ref={headerRef}>
        <div className="site-header__inner">
          <Link className="brand" to="/">
            <img className="brand__mark" src="/logoRotary.png" alt="Logo Fundación Rotary Puerto Ordaz" />
            <span className="brand__copy">
              <strong>Ambulatorio Roberto De Santis</strong>
              <span>Fundación Rotary Puerto Ordaz</span>
            </span>
          </Link>

          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
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
      <div
        className={`menu-overlay ${menuOpen ? "menu-overlay--open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
};

export default Header;
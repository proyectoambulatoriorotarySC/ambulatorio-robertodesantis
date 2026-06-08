import { Link } from "react-router-dom";
import { useConfiguracion } from "../hooks/useConfiguracion";
import { mockConfiguracionGlobal } from "../data/mockData";

const Footer = () => {
  const { configuracion } = useConfiguracion();
  const footerData = configuracion ?? mockConfiguracionGlobal;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__title">Ambulatorio Roberto De Santis</p>
          <p className="site-footer__text">{footerData.direccionFisica}</p>
        </div>

        <div>
          <p className="site-footer__title">Contacto</p>
          <a href={`tel:${footerData.telefonoContacto}`} className="site-footer__link">
            {footerData.telefonoContacto}
          </a>
          <p className="site-footer__text">{footerData.horarioGeneral}</p>
        </div>

        <div>
          <p className="site-footer__title">Accesos</p>
          <Link to="/especialidades" className="site-footer__link">Especialidades</Link>
          <Link to="/nosotros" className="site-footer__link">Ubicación</Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Ambulatorio Roberto De Santis</span>
        <span>Atención médica comunitaria</span>
      </div>
    </footer>
  );
};

export default Footer;
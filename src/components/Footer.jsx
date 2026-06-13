import { Link } from "react-router-dom";
import { useConfiguracion } from "../hooks/useConfiguracion";
import { mockConfiguracionGlobal } from "../data/mockData";

const Footer = () => {
  const { configuracion } = useConfiguracion();
  const footerData = configuracion ?? mockConfiguracionGlobal;

  // Generamos el enlace de contacto (Preferiblemente WhatsApp si está configurado)
  const whatsappNumber = footerData.whatsappContacto?.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(footerData.mensajePredefinido || "");
  const contactHref = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}${encodedMessage ? `?text=${encodedMessage}` : ""}`
    : `tel:${footerData.telefonoContacto?.replace(/[^0-9]/g, "")}`;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__title">Ambulatorio Roberto De Santis</p>
          <p className="site-footer__text">{footerData.direccionFisica}</p>
        </div>

        <div>
          <p className="site-footer__title">Contacto</p>
          <a 
            href={contactHref} 
            className="site-footer__link" 
            target={whatsappNumber ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {footerData.telefonoContacto}
            {whatsappNumber && <span style={{marginLeft: '0.5rem', fontSize: '0.8em'}}>(WhatsApp)</span>}
          </a>
          <p className="site-footer__text">{footerData.horarioGeneral}</p>
        </div>

        <div>
          <p className="site-footer__title">Accesos</p>
          <Link to="/directorio" className="site-footer__link">Directorio</Link>
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
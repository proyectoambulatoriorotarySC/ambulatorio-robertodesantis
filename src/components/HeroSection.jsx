import { Link } from "react-router-dom";

const HeroSection = ({ hero, configuracion }) => {
  const whatsappNumber = configuracion?.whatsappContacto?.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(configuracion?.mensajePredefinido || "Hola, quisiera solicitar información.");
  const contactHref = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `tel:${configuracion?.telefonoContacto?.replace(/[^0-9]/g, "") || "04141915455"}`;

  return (
    <section className="hero-section">
      <div className="hero-section__overlay" aria-hidden="true" />
      <div className="hero-section__content">
        <span className="section-kicker section-kicker--hero">{hero.eyebrow}</span>
        <h1>{hero.title}</h1>
        <p>{hero.summary}</p>

        <div className="hero-section__actions">
          <Link to="/directorio" className="button button--primary">
            Ver Directorio
          </Link>
          <a 
            href={contactHref} 
            className="button button--secondary"
            target={whatsappNumber ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {whatsappNumber ? "Enviar WhatsApp" : "Llamar al ambulatorio"}
          </a>
        </div>
      </div>

      <aside className="hero-section__card">
        <strong>Atención comunitaria</strong>
        <p>{configuracion?.horarioGeneral || "Lunes a viernes de 7:30 am a 3:00 pm"}</p>
        <span>{configuracion?.direccionFisica || "Ventuari, Puerto Ordaz"}</span>
      </aside>
    </section>
  );
};

export default HeroSection;
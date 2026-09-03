import { mockConfiguracionGlobal } from "../data/mockData";
import { useReveal } from "../hooks/useReveal";

const MapaUbicacion = ({ configuracion }) => {
  const { ref: sectionRef, isVisible } = useReveal();
  const data = configuracion ?? mockConfiguracionGlobal;
  const whatsappNumber = data.whatsappContacto?.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(data.mensajePredefinido || "Hola, quisiera solicitar información.");
  const contactHref = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `tel:${data.telefonoContacto?.replace(/[^0-9]/g, "")}`;

  return (
    <section className={`contact-section content-section reveal ${isVisible ? "reveal--visible" : ""}`} id="ubicacion" ref={sectionRef}>
      <div className="contact-section__copy">
        <span className="section-kicker section-kicker--gold">Ubicación y Contacto</span>
        <h2>Consulta de Disponibilidad</h2>
        <p>
          Av. Norte Sur 4 Parcela 296-14-01, Ventuari. Cerca de la intersección con la Av. Atlántico.
        </p>

        <div className="contact-section__info">
          <article>
            <strong>Dirección</strong>
            <p>{data.direccionFisica}</p>
          </article>
          <article>
            <strong>Horario General</strong>
            <p>{data.horarioGeneral}</p>
          </article>
        </div>

        <a 
          className="contact-call" 
          href={contactHref}
          target={whatsappNumber ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          {whatsappNumber ? "Enviar mensaje WhatsApp" : `Llamar ahora: ${data.telefonoContacto}`}
        </a>
      </div>

      <div className="contact-section__map">
        <iframe
          title="Ubicación del Ambulatorio Roberto De Santis"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1647.7154441271841!2d-62.77106281691475!3d8.268140540993834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dcbf92c5ec7a69b%3A0x801f915ceb4f6eef!2sCentro%20M%C3%A9dico%20Rotary%20Club!5e1!3m2!1ses!2sve!4v1788472971254!5m2!1ses!2sve"
        />
      </div>
    </section>
  );
};

export default MapaUbicacion;
import { supportServices } from "../data/siteContent";
import { useReveal } from "../hooks/useReveal";

const ServiciosApoyo = () => {
  const { ref: sectionRef, isVisible } = useReveal();
  return (
    <section className={`content-section reveal ${isVisible ? "reveal--visible" : ""}`} id="apoyo" ref={sectionRef}>
      <div className="section-heading">
        <span className="section-kicker section-kicker--neutral">Información Importante</span>
        <h2>Requisitos y Servicios de Apoyo</h2>
        <p>Conoce nuestros horarios de atención para estudios especiales y requisitos necesarios para tus exámenes.</p>
      </div>

      <div className="support-grid">
        {supportServices.map((item, i) => (
          <article key={item.title} className={`stagger-card support-card support-card--${item.accent}`} style={{ "--i": i }}>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServiciosApoyo;
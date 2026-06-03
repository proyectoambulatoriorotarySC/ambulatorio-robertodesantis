import { supportServices } from "../data/siteContent";

const ServiciosApoyo = () => {
  return (
    <section className="content-section" id="apoyo">
      <div className="section-heading">
        <span className="section-kicker section-kicker--neutral">Información Importante</span>
        <h2>Requisitos y Servicios de Apoyo</h2>
        <p>Conoce nuestros horarios de atención para estudios especiales y requisitos necesarios para tus exámenes.</p>
      </div>

      <div className="support-grid">
        {supportServices.map((item) => (
          <article key={item.title} className={`support-card support-card--${item.accent}`}>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServiciosApoyo;
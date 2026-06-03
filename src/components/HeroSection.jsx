const HeroSection = ({ hero, configuracion }) => {
  return (
    <section className="hero-section">
      <div className="hero-section__overlay" aria-hidden="true" />
      <div className="hero-section__content">
        <span className="section-kicker section-kicker--hero">{hero.eyebrow}</span>
        <h1>{hero.title}</h1>
        <p>{hero.summary}</p>

        <div className="hero-section__actions">
          <a href="#especialidades" className="button button--primary">
            Ver especialidades
          </a>
          <a href={`tel:${configuracion?.telefonoContacto || "0414-191-5455"}`} className="button button--secondary">
            Llamar al ambulatorio
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
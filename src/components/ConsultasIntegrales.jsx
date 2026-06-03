import { consultationPackages } from "../data/siteContent";
import { mockConfiguracionGlobal } from "../data/mockData";

const ConsultasIntegrales = ({ configuracion }) => {
  const packages = configuracion?.consultasIntegrales?.length
    ? configuracion.consultasIntegrales
    : mockConfiguracionGlobal.consultasIntegrales || consultationPackages;

  return (
    <section className="content-section content-section--soft" id="servicios">
      <div className="section-heading">
        <span className="section-kicker">Servicios Destacados</span>
        <h2>Consultas Integrales</h2>
        <p>
          Optimiza tu tiempo y recursos. Estas especialidades incluyen estudios de diagnóstico en una sola visita.
        </p>
      </div>

      <div className="feature-grid">
        {packages.map((item) => (
          <article key={item.title} className="feature-card">
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ConsultasIntegrales;
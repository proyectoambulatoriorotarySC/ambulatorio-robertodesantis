import { institutionalContent } from "../data/siteContent";
import { mockConfiguracionGlobal } from "../data/mockData";

const MisionVision = ({ configuracion }) => {
  const data = configuracion ?? mockConfiguracionGlobal;

  return (
    <section className="content-section" id="nosotros">
      <div className="section-heading">
        <span className="section-kicker section-kicker--neutral">Nuestra Institución</span>
        <h2>Misión, Visión e Historia</h2>
        <p>Información institucional con respaldo local y datos operativos de referencia.</p>
      </div>

      <div className="mission-grid">
        <article className="mission-card">
          <strong>Misión</strong>
          <p>{institutionalContent.mision}</p>
        </article>
        <article className="mission-card">
          <strong>Visión</strong>
          <p>{institutionalContent.vision}</p>
        </article>
        <article className="mission-card">
          <strong>Historia</strong>
          <p>{institutionalContent.historia}</p>
        </article>
        <article className="mission-card mission-card--highlight">
          <strong>Horario general</strong>
          <p>{data.horarioGeneral}</p>
          <p>{data.direccionFisica}</p>
        </article>
      </div>
    </section>
  );
};

export default MisionVision;
import { mockConfiguracionGlobal } from "../data/mockData";

const MapaUbicacion = ({ configuracion }) => {
  const data = configuracion ?? mockConfiguracionGlobal;

  return (
    <section className="contact-section content-section" id="ubicacion">
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

        <a className="contact-call" href={`tel:${data.telefonoContacto}`}>
          Llamar ahora: {data.telefonoContacto}
        </a>
      </div>

      <div className="contact-section__map">
        <iframe
          title="Ubicación del Ambulatorio Roberto De Santis"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Centro%20M%C3%A9dico%20Rotary%20Club%20Venezuela&output=embed"
        />
      </div>
    </section>
  );
};

export default MapaUbicacion;
const dayLabels = [
  ["lunes", "Lunes"],
  ["martes", "Martes"],
  ["miercoles", "Miércoles"],
  ["jueves", "Jueves"],
  ["viernes", "Viernes"],
];

const HorarioEspecialidad = ({ especialidad }) => {
  if (!especialidad) {
    return (
      <section className="schedule-panel schedule-panel--empty">
        <p>Selecciona una especialidad para ver sus días y turnos.</p>
      </section>
    );
  }

  return (
    <section className="schedule-panel">
      <div className="schedule-panel__header">
        <div>
          <p className="section-kicker">Disponibilidad</p>
          <h3>{especialidad.nombre}</h3>
        </div>
        <p className="schedule-panel__text">{especialidad.textoHorarioPlano}</p>
      </div>

      <div className="schedule-grid">
        {dayLabels.map(([dayKey, dayLabel]) => {
          const turnos = especialidad.cronograma?.[dayKey] ?? { mañana: false, tarde: false };

          return (
            <article key={dayKey} className="schedule-day">
              <strong>{dayLabel}</strong>
              <div className="schedule-turns">
                <span className={turnos.mañana ? "schedule-turns__item schedule-turns__item--on" : "schedule-turns__item"}>
                  Mañana
                </span>
                <span className={turnos.tarde ? "schedule-turns__item schedule-turns__item--on" : "schedule-turns__item"}>
                  Tarde
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <p className="schedule-panel__footnote">
        Médicos asignados: {(especialidad.medicos || []).join(" · ") || "Por confirmar"}
      </p>
    </section>
  );
};

export default HorarioEspecialidad;
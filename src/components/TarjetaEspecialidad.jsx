const TarjetaEspecialidad = ({ especialidad, isActive, onSelect }) => {
  return (
    <button
      type="button"
      className={`specialty-card ${isActive ? "specialty-card--active" : ""}`}
      onClick={() => onSelect(especialidad)}
    >
      <span className={`specialty-card__icon specialty-card__icon--${especialidad.accent || "blue"}`} aria-hidden="true">
        {especialidad.symbol || especialidad.nombre.slice(0, 1)}
      </span>
      <strong>{especialidad.nombre}</strong>
      <span className="specialty-card__meta">Incluye estudio</span>
      <span className="specialty-card__study">{especialidad.estudioIncluido}</span>
    </button>
  );
};

export default TarjetaEspecialidad;
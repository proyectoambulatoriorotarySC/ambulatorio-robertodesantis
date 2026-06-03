import TarjetaEspecialidad from "./TarjetaEspecialidad";

const ListaEspecialidades = ({ especialidades, activeId, onSelect }) => {
  return (
    <section className="specialty-grid" aria-label="Listado de especialidades" id="especialidades">
      {especialidades.map((especialidad) => (
        <TarjetaEspecialidad
          key={especialidad.id}
          especialidad={especialidad}
          isActive={activeId === especialidad.id}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
};

export default ListaEspecialidades;
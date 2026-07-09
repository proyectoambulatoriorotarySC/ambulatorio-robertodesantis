import TarjetaEspecialidad from "./TarjetaEspecialidad";

const ListaEspecialidades = ({ especialidades, searchTerm }) => {
  return (
    <section className="specialty-grid" aria-label="Listado de especialidades" id="especialidades">
      {especialidades.map((especialidad, i) => (
        <TarjetaEspecialidad
          key={especialidad.id}
          especialidad={especialidad}
          searchTerm={searchTerm}
          index={i}
        />
      ))}
    </section>
  );
};

export default ListaEspecialidades;

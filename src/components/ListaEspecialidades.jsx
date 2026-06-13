import TarjetaEspecialidad from "./TarjetaEspecialidad";

const ListaEspecialidades = ({ especialidades, searchTerm }) => {
  return (
    <section className="specialty-grid" aria-label="Listado de especialidades" id="especialidades">
      {especialidades.map((especialidad) => (
        <TarjetaEspecialidad
          key={especialidad.id}
          especialidad={especialidad}
          searchTerm={searchTerm}
        />
      ))}
    </section>
  );
};

export default ListaEspecialidades;

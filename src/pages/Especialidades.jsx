import { useMemo, useState } from "react";
import { useEspecialidades } from "../hooks/useEspecialidades";
import { makeFallbackSchedule, specialtyCatalog } from "../data/siteContent";
import Buscador from "../components/Buscador";
import ListaEspecialidades from "../components/ListaEspecialidades";

const normalizeValue = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const Especialidades = () => {
  const { especialidades, isLoading } = useEspecialidades();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpecialities = useMemo(() => {
    const needle = normalizeValue(searchTerm);

    if (!needle) {
      return especialidades;
    }

    return especialidades.filter((item) => {
      const searchableText = [
        item.nombre,
        ...(item.medicos || []),
        item.estudioIncluido,
        item.textoHorarioPlano
      ]
        .filter(Boolean)
        .map(normalizeValue)
        .join(" ");

      return searchableText.includes(needle);
    });
  }, [searchTerm, especialidades]);

  if (isLoading) {
    return (
      <div className="loading-state">
        <p>Cargando catálogo de especialidades...</p>
      </div>
    );
  }

  return (
    <>
      <section className="content-section content-section--search">
        <div className="section-heading">
          <span className="section-kicker">Consulta de Disponibilidad</span>
          <h2>Encuentra tu especialidad</h2>
          <p>Busca por nombre del médico, servicio o especialidad y revisa horarios disponibles al instante.</p>
        </div>

        <Buscador onSearchChange={setSearchTerm} />

        <div className="specialty-summary">
          <span>{filteredSpecialities.length} resultados</span>
          <span>Actualización en tiempo real desde la base de datos</span>
        </div>

        <ListaEspecialidades especialidades={filteredSpecialities} />
      </section>
    </>
  );
};

export default Especialidades;

import { useEffect, useMemo, useState } from "react";
import { useEspecialidades } from "../hooks/useEspecialidades";
import { makeFallbackSchedule, specialtyCatalog } from "../data/siteContent";
import Buscador from "../components/Buscador";
import ListaEspecialidades from "../components/ListaEspecialidades";
import HorarioEspecialidad from "../components/HorarioEspecialidad";

const normalizeValue = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const mergeEspecialidades = (backendSpecialties = []) => {
  const backendMap = new Map();

  backendSpecialties.forEach((specialty) => {
    const normalizedId = normalizeValue(specialty.id);
    const normalizedName = normalizeValue(specialty.nombre);
    backendMap.set(normalizedId, specialty);
    backendMap.set(normalizedName, specialty);
  });

  const merged = specialtyCatalog.map((baseSpecialty) => {
    const backendSpecialty = backendMap.get(normalizeValue(baseSpecialty.id)) || backendMap.get(normalizeValue(baseSpecialty.nombre));

    if (!backendSpecialty) {
      return baseSpecialty;
    }

    return {
      ...baseSpecialty,
      ...backendSpecialty,
      cronograma: backendSpecialty.cronograma ?? baseSpecialty.cronograma ?? makeFallbackSchedule(baseSpecialty.nombre),
      medicos: backendSpecialty.medicos ?? baseSpecialty.medicos,
      estudioIncluido: backendSpecialty.estudioIncluido ?? baseSpecialty.estudioIncluido,
      textoHorarioPlano: backendSpecialty.textoHorarioPlano ?? baseSpecialty.textoHorarioPlano,
    };
  });

  backendSpecialties.forEach((specialty) => {
    const normalizedId = normalizeValue(specialty.id);
    const normalizedName = normalizeValue(specialty.nombre);

    const alreadyIncluded = merged.some(
      (item) => normalizeValue(item.id) === normalizedId || normalizeValue(item.nombre) === normalizedName
    );

    if (!alreadyIncluded) {
      merged.push({
        ...specialty,
        cronograma: specialty.cronograma ?? makeFallbackSchedule(specialty.nombre),
      });
    }
  });

  return merged;
};

const Especialidades = () => {
  const { especialidades } = useEspecialidades();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState(specialtyCatalog[0]?.id);

  const specialities = useMemo(() => mergeEspecialidades(especialidades), [especialidades]);

  const filteredSpecialities = useMemo(() => {
    const needle = normalizeValue(searchTerm);

    if (!needle) {
      return specialities;
    }

    return specialities.filter((item) => {
      const searchableText = [item.nombre, ...(item.medicos || []), item.estudioIncluido, item.textoHorarioPlano]
        .filter(Boolean)
        .map(normalizeValue)
        .join(" ");

      return searchableText.includes(needle);
    });
  }, [searchTerm, specialities]);

  useEffect(() => {
    if (!filteredSpecialities.length) {
      return;
    }

    const selectedExists = filteredSpecialities.some((item) => item.id === selectedId);

    if (!selectedExists) {
      setSelectedId(filteredSpecialities[0].id);
    }
  }, [filteredSpecialities, selectedId]);

  const selectedSpecialty = filteredSpecialities.find((item) => item.id === selectedId) || filteredSpecialities[0];

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
          <span>Actualización en tiempo real de configuración y catálogo</span>
        </div>

        <ListaEspecialidades
          especialidades={filteredSpecialities}
          activeId={selectedSpecialty?.id}
          onSelect={(item) => setSelectedId(item.id)}
        />

        <HorarioEspecialidad especialidad={selectedSpecialty} />
      </section>
    </>
  );
};

export default Especialidades;

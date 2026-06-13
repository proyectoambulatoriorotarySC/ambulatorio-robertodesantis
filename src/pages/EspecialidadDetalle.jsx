import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { useEspecialidades } from "../hooks/useEspecialidades";
import { specialtyCatalog } from "../data/siteContent";
import * as Icons from "lucide-react";
import HorarioEspecialidad from "../components/HorarioEspecialidad";

const iconComponents = {
  Activity: Icons.Activity,
  Apple: Icons.Apple,
  Baby: Icons.Baby,
  Bone: Icons.Bone,
  Brain: Icons.Brain,
  Diamond: Icons.Diamond,
  Droplets: Icons.Droplets,
  Ear: Icons.Ear,
  Eye: Icons.Eye,
  Filter: Icons.Filter,
  FlaskConical: Icons.FlaskConical,
  Flower2: Icons.Flower2,
  Heart: Icons.Heart,
  MessageCircle: Icons.MessageCircle,
  Scan: Icons.Scan,
  ScanFace: Icons.ScanFace,
  Scissors: Icons.Scissors,
  Stethoscope: Icons.Stethoscope,
  Syringe: Icons.Syringe,
  Venus: Icons.Venus,
  Wind: Icons.Wind,
};

const normalizeValue = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const EspecialidadDetalle = () => {
  const { id } = useParams();
  const { especialidades, isLoading } = useEspecialidades();

  const especialidad = useMemo(() => {
    const normalizedId = normalizeValue(id);

    return especialidades.find(
      (item) => normalizeValue(item.id) === normalizedId || normalizeValue(item.nombre) === normalizedId
    );
  }, [id, especialidades]);

  if (isLoading) {
    return (
      <div className="loading-state">
        <p>Cargando detalles...</p>
      </div>
    );
  }

  if (!especialidad) {
    return (
      <section className="content-section">
        <div className="section-heading">
          <span className="section-kicker">No encontrada</span>
          <h2>Especialidad no disponible</h2>
          <p>La especialidad que buscas no existe o no está disponible actualmente.</p>
          <Link to="/directorio" className="button button--primary" style={{ marginTop: "1rem" }}>
            Volver al Directorio
          </Link>
        </div>
      </section>
    );
  }

  const IconComponent = iconComponents[especialidad.icon] || Icons.Stethoscope;

  return (
    <section className="content-section">
      <div className="detail-header">
        <Link to="/directorio" className="detail-back">&larr; Volver al Directorio Médico</Link>
      </div>

      <div className="detail-card">
        <div className="detail-card__header">
          <span className={`specialty-card__icon specialty-card__icon--${especialidad.accent || "blue"}`}>
            <IconComponent size={36} />
          </span>
          <div>
            <span className="section-kicker">Especialidad</span>
            <h2>{especialidad.nombre}</h2>
          </div>
        </div>

        <div className="detail-card__info">
          <div className="detail-card__medicos">
            <strong>Médicos asignados</strong>
            <ul>
              {(especialidad.medicos || []).length > 0
                ? especialidad.medicos.map((medico, i) => <li key={i}>{medico}</li>)
                : <li className="detail-card__empty">Por confirmar</li>}
            </ul>
          </div>

          {especialidad.estudioIncluido && (
            <div className="detail-card__estudio">
              <strong>Estudio / Servicio Adicional</strong>
              <p>{especialidad.estudioIncluido}</p>
            </div>
          )}
        </div>

        <HorarioEspecialidad especialidad={especialidad} />
      </div>
    </section>
  );
};

export default EspecialidadDetalle;
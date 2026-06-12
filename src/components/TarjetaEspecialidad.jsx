import { Link } from "react-router-dom";
import * as Icons from "lucide-react";

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

const TarjetaEspecialidad = ({ especialidad, isActive }) => {
  const IconComponent = iconComponents[especialidad.icon] || Icons.Stethoscope;

  return (
    <Link
      to={`/especialidades/${especialidad.id}`}
      className={`specialty-card ${isActive ? "specialty-card--active" : ""}`}
    >
      <span className={`specialty-card__icon specialty-card__icon--${especialidad.accent || "blue"}`} aria-hidden="true">
        <IconComponent size={28} />
      </span>
      <strong>{especialidad.nombre}</strong>
      <span className="specialty-card__meta">Incluye estudio</span>
      <span className="specialty-card__study">{especialidad.estudioIncluido}</span>
    </Link>
  );
};

export default TarjetaEspecialidad;
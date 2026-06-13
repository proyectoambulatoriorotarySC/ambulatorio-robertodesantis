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

const normalizeValue = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const TarjetaEspecialidad = ({ especialidad, isActive, searchTerm }) => {
  const IconComponent = iconComponents[especialidad.icon] || Icons.Stethoscope;

  const matchingDoctors = searchTerm
    ? (especialidad.medicos || []).filter((doc) =>
        normalizeValue(doc).includes(normalizeValue(searchTerm))
      )
    : [];

  return (
    <Link
      to={`/directorio/${especialidad.id}`}
      className={`specialty-card ${isActive ? "specialty-card--active" : ""}`}
    >
      <span className={`specialty-card__icon specialty-card__icon--${especialidad.accent || "blue"}`} aria-hidden="true">
        <IconComponent size={28} />
      </span>
      <strong>{especialidad.nombre}</strong>

      {matchingDoctors.length > 0 && (
        <div className="specialty-card__match">
          {matchingDoctors.map((doc, i) => (
            <span key={i} className="specialty-card__doctor-badge">
              <Icons.User size={12} /> {doc}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

export default TarjetaEspecialidad;
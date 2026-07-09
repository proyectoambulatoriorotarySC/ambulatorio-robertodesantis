import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { Tooth as CustomTooth } from "./CustomIcons";

const iconComponents = {
  Activity: Icons.Activity,
  Ambulance: Icons.Ambulance,
  Apple: Icons.Apple,
  Baby: Icons.Baby,
  Bandage: Icons.Bandage,
  Bone: Icons.Bone,
  Brain: Icons.Brain,
  BrainCircuit: Icons.BrainCircuit,
  BriefcaseMedical: Icons.BriefcaseMedical,
  Diamond: Icons.Diamond,
  Dna: Icons.Dna,
  Droplets: Icons.Droplets,
  Ear: Icons.Ear,
  Eye: Icons.Eye,
  Filter: Icons.Filter,
  FlaskConical: Icons.FlaskConical,
  Flower2: Icons.Flower2,
  HandHelping: Icons.HandHelping,
  HandPlatter: Icons.HandPlatter,
  Heart: Icons.Heart,
  HeartPulse: Icons.HeartPulse,
  Hospital: Icons.Hospital,
  Lungs: Icons.Wind,
  MessageCircle: Icons.MessageCircle,
  Microscope: Icons.Microscope,
  Pill: Icons.Pill,
  Radiation: Icons.Radiation,
  Scale: Icons.Scale,
  Scan: Icons.Scan,
  ScanFace: Icons.ScanFace,
  Scissors: Icons.Scissors,
  ShieldPlus: Icons.ShieldPlus,
  Stethoscope: Icons.Stethoscope,
  Syringe: Icons.Syringe,
  Tablets: Icons.Tablets,
  Thermometer: Icons.Thermometer,
  Tooth: CustomTooth,
  UserRound: Icons.UserRound,
  Users: Icons.Users,
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

const TarjetaEspecialidad = ({ especialidad, isActive, searchTerm, index = 0 }) => {
  const IconComponent = iconComponents[especialidad.icon] || Icons.Stethoscope;

  const matchingDoctors = searchTerm
    ? (especialidad.medicos || []).filter((doc) =>
        normalizeValue(doc).includes(normalizeValue(searchTerm))
      )
    : [];

  return (
    <Link
      to={`/directorio/${especialidad.id}`}
      className={`stagger-card specialty-card specialty-card--accent-${especialidad.accent || "blue"} ${isActive ? "specialty-card--active" : ""}`}
      style={{ "--i": index }}
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
import { useEffect, useMemo, useState } from "react";
import { useEspecialidades } from "../hooks/useEspecialidades";
import * as LucideIcons from "lucide-react";
import { Tooth as CustomTooth } from "./CustomIcons";

const iconOptions = [
  { value: "Stethoscope", label: "Estetoscopio", Icon: LucideIcons.Stethoscope },
  { value: "Heart", label: "Corazón", Icon: LucideIcons.Heart },
  { value: "HeartPulse", label: "Pulso Cardíaco", Icon: LucideIcons.HeartPulse },
  { value: "Activity", label: "Actividad/ECG", Icon: LucideIcons.Activity },
  { value: "Microscope", label: "Microscopio/Análisis", Icon: LucideIcons.Microscope },
  { value: "Pill", label: "Píldora/Farmacia", Icon: LucideIcons.Pill },
  { value: "Tablets", label: "Tabletas/Medicinas", Icon: LucideIcons.Tablets },
  { value: "Syringe", label: "Inyectable/Vacuna", Icon: LucideIcons.Syringe },
  { value: "Thermometer", label: "Temperatura/Fiebre", Icon: LucideIcons.Thermometer },
  { value: "Bandage", label: "Venda/Traumatología", Icon: LucideIcons.Bandage },
  { value: "BriefcaseMedical", label: "Maletín Médico", Icon: LucideIcons.BriefcaseMedical },
  { value: "Hospital", label: "Hospital/Clínica", Icon: LucideIcons.Hospital },
  { value: "Ambulance", label: "Ambulancia/Urgencias", Icon: LucideIcons.Ambulance },
  { value: "Brain", label: "Cerebro/Neurología", Icon: LucideIcons.Brain },
  { value: "BrainCircuit", label: "Psicología/Mente", Icon: LucideIcons.BrainCircuit },
  { value: "Lungs", label: "Pulmones/Neumonología", Icon: LucideIcons.Lungs },
  { value: "Baby", label: "Bebé/Pediatría", Icon: LucideIcons.Baby },
  { value: "Bone", label: "Hueso/Ortopedia", Icon: LucideIcons.Bone },
  { value: "Eye", label: "Ojo/Oftalmología", Icon: LucideIcons.Eye },
  { value: "Ear", label: "Oído/Otorrino", Icon: LucideIcons.Ear },
  { value: "Venus", label: "Mujer/Ginecología", Icon: LucideIcons.Venus },
  { value: "FlaskConical", label: "Laboratorio/Química", Icon: LucideIcons.FlaskConical },
  { value: "Dna", label: "ADN/Genética", Icon: LucideIcons.Dna },
  { value: "Radiation", label: "Rayos X/Radiología", Icon: LucideIcons.Radiation },
  { value: "Scale", label: "Balanza/Nutrición", Icon: LucideIcons.Scale },
  { value: "ShieldPlus", label: "Prevención/Salud", Icon: LucideIcons.ShieldPlus },
  { value: "Scissors", label: "Cirugía", Icon: LucideIcons.Scissors },
  { value: "Apple", label: "Nutrición/Dieta", Icon: LucideIcons.Apple },
  { value: "Wind", label: "Respiratorio", Icon: LucideIcons.Wind },
  { value: "Droplets", label: "Sangre/Urología", Icon: LucideIcons.Droplets },
  { value: "Tooth", label: "Odontología/Diente", Icon: CustomTooth },
  { value: "HandPlatter", label: "Servicios/Atención", Icon: LucideIcons.HandPlatter },
  { value: "UserRound", label: "Usuario/Personal", Icon: LucideIcons.UserRound },
  { value: "Users", label: "Usuarios/Familia", Icon: LucideIcons.Users },
  { value: "HandHelping", label: "Ayuda/Apoyo", Icon: LucideIcons.HandHelping },
].filter(opt => !!opt.Icon);

const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
const turnos = ["mañana", "tarde"];

const emptySchedule = () =>
  days.reduce((accumulator, day) => {
    accumulator[day] = { mañana: false, tarde: false };
    return accumulator;
  }, {});

const normalizeId = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const buildScheduleFromData = (data) => {
  if (!data) {
    return emptySchedule();
  }

  return days.reduce((accumulator, day) => {
    const source = data.cronograma?.[day];

    if (source && typeof source === "object" && !Array.isArray(source)) {
      accumulator[day] = {
        mañana: Boolean(source.mañana),
        tarde: Boolean(source.tarde),
      };
      return accumulator;
    }

    if (Array.isArray(source)) {
      accumulator[day] = {
        mañana: source.includes("mañana"),
        tarde: source.includes("tarde"),
      };
      return accumulator;
    }

    accumulator[day] = {
      mañana: false,
      tarde: false,
    };

    return accumulator;
  }, {});
};

const AdminEspecialidades = () => {
  const { especialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad } = useEspecialidades();
  const [selectedId, setSelectedId] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    nombre: "",
    icon: "",
    medicos: [],
    textoHorarioPlano: "",
    estudioIncluido: "",
    cronograma: emptySchedule(),
  });
  const [newDoctor, setNewDoctor] = useState({ title: "Dr.", firstName: "", lastName: "" });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (!especialidades.length || isCreatingNew) {
      return;
    }

    const item = especialidades.find((entry) => entry.id === selectedId) || especialidades[0];

    setSelectedId(item.id);
    setFormState({
      id: item.id || "",
      nombre: item.nombre || "",
      icon: item.icon || "",
      medicos: item.medicos || [],
      textoHorarioPlano: item.textoHorarioPlano || "",
      estudioIncluido: item.estudioIncluido || "",
      cronograma: buildScheduleFromData(item),
    });
  }, [especialidades, selectedId, isCreatingNew]);

  const handleSelect = (id) => {
    setIsCreatingNew(false);
    setSelectedId(id);
    setStatus({ type: "", message: "" });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => {
      const newState = { ...current, [name]: value };
      if (isCreatingNew && name === "nombre") {
        const oldNormalized = normalizeId(current.nombre);
        if (!current.id || current.id === oldNormalized) {
          newState.id = normalizeId(value);
        }
      }
      return newState;
    });
  };

  const handleScheduleToggle = (day, turno) => {
    setFormState((current) => ({
      ...current,
      cronograma: {
        ...current.cronograma,
        [day]: {
          ...current.cronograma[day],
          [turno]: !current.cronograma[day][turno],
        },
      },
    }));
  };

  const addDoctor = () => {
    const { title, firstName, lastName } = newDoctor;
    const fullName = `${title} ${firstName.trim()} ${lastName.trim()}`.trim();
    if (!firstName.trim() || !lastName.trim()) {
      setStatus({ type: "error", message: "Nombre y apellido son obligatorios." });
      return;
    }
    if (formState.medicos.some(m => m.toLowerCase() === fullName.toLowerCase())) {
      setStatus({ type: "error", message: "Este médico ya está en la lista." });
      return;
    }
    setFormState((current) => ({
      ...current,
      medicos: [...current.medicos, fullName],
    }));
    setNewDoctor({ title: "Dr.", firstName: "", lastName: "" });
    setStatus({ type: "", message: "" });
  };

  const handleDoctorKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addDoctor();
    }
  };

  const removeDoctor = (index) => {
    setFormState((current) => ({
      ...current,
      medicos: current.medicos.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const resetForm = () => {
    setIsCreatingNew(true);
    setSelectedId("");
    setFormState({
      id: "",
      nombre: "",
      icon: "",
      medicos: [],
      textoHorarioPlano: "",
      estudioIncluido: "",
      cronograma: emptySchedule(),
    });
    setStatus({ type: "", message: "Creando especialidad nueva. Por favor, rellena los campos." });
  };

  const isFormValid = useMemo(() => {
    return (
      formState.nombre.trim().length > 0 &&
      (formState.id.trim().length > 0 || formState.nombre.trim().length > 0) &&
      formState.icon !== ""
    );
  }, [formState]);

  const submitForm = async (event) => {
    event.preventDefault();
    const id = formState.id.trim() || normalizeId(formState.nombre);
    if (!id || !formState.nombre.trim()) {
      setStatus({ type: "error", message: "El nombre y el ID son obligatorios." });
      return;
    }
    if (formState.icon === "") {
      setStatus({ type: "error", message: "Debes seleccionar un icono." });
      return;
    }
    const payload = {
      nombre: formState.nombre.trim(),
      icon: formState.icon,
      medicos: formState.medicos,
      textoHorarioPlano: formState.textoHorarioPlano.trim(),
      estudioIncluido: formState.estudioIncluido.trim(),
      cronograma: formState.cronograma,
    };
    setSaving(true);
    setStatus({ type: "", message: "" });
    try {
      if (isCreatingNew) {
        const duplicate = especialidades.find(esp => esp.id === id);
        if (duplicate) {
          throw new Error("Ya existe una especialidad con ese ID.");
        }
      }
      const existing = especialidades.find((item) => item.id === id);
      if (existing && !isCreatingNew) {
        await updateEspecialidad(id, payload);
        setStatus({ type: "success", message: "Especialidad actualizada correctamente." });
      } else {
        await createEspecialidad(id, payload);
        setIsCreatingNew(false);
        setSelectedId(id);
        setStatus({ type: "success", message: "Especialidad creada correctamente." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ 
        type: "error", 
        message: error.message === "Ya existe una especialidad con ese ID." 
          ? error.message 
          : "No fue posible guardar la especialidad." 
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteCurrent = async () => {
    if (!selectedId) return;
    if (!window.confirm(`¿Estás seguro de eliminar "${formState.nombre}"? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteEspecialidad(selectedId);
      setStatus({ type: "success", message: "Especialidad eliminada." });
      setIsCreatingNew(false);
      resetForm();
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "No fue posible eliminar la especialidad." });
    }
  };

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-card__header">
        <div>
          <span className="section-kicker section-kicker--neutral">CRUD Especialidades</span>
          <h2>Crear, editar y eliminar</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" className="button button--secondary" onClick={resetForm}>
            Nueva especialidad
          </button>
        </div>
      </div>

      <div className="admin-split admin-split--wide">
        <aside className="admin-list admin-list--scroll">
          {especialidades.length > 0 ? (
            especialidades.map((item) => (
              <button
                key={item.id}
                type="button"
                className={selectedId === item.id ? "admin-list__item admin-list__item--active" : "admin-list__item"}
                onClick={() => handleSelect(item.id)}
              >
                <strong>{item.nombre}</strong>
                <span>{(item.medicos || []).join(" · ") || "Sin médicos"}</span>
              </button>
            ))
          ) : (
            <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
              <p>Base de datos vacía.</p>
            </div>
          )}
        </aside>

        <form className="admin-form admin-form--grid" onSubmit={submitForm}>
          <label>
            Nombre de la especialidad *
            <input name="nombre" value={formState.nombre} onChange={handleFieldChange} placeholder="Ej: Cardiología" required />
          </label>
          <label>
            ID de documento (Autogenerado)
            <input name="id" value={formState.id} onChange={handleFieldChange} placeholder="cardiologia-general" disabled={!isCreatingNew} />
          </label>
          <div className="admin-icon-picker">
            <label>Icono representativo *</label>
            <div className={`admin-custom-select ${isIconPickerOpen ? "admin-custom-select--open" : ""}`}>
              <button type="button" className="admin-custom-select__trigger" onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}>
                {formState.icon ? (
                  <>
                    {(() => {
                      const opt = iconOptions.find(o => o.value === formState.icon);
                      const Icon = opt?.Icon || LucideIcons.Stethoscope;
                      return <Icon size={20} />;
                    })()}
                    <span>{iconOptions.find(o => o.value === formState.icon)?.label || "Seleccionar..."}</span>
                  </>
                ) : (
                  <span>Seleccionar icono...</span>
                )}
                <LucideIcons.ChevronDown size={18} className="admin-custom-select__arrow" />
              </button>
              {isIconPickerOpen && (
                <div className="admin-custom-select__options">
                  {iconOptions.map((opt) => {
                    const Icon = opt.Icon;
                    return (
                      <button key={opt.value} type="button" className={`admin-custom-select__option ${formState.icon === opt.value ? "active" : ""}`}
                        onClick={() => { setFormState(curr => ({ ...curr, icon: opt.value })); setIsIconPickerOpen(false); }}>
                        <Icon size={18} />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="admin-doctors">
            <label>Médicos (Completa los campos y pulsa Enter o Agregar)</label>
            <div className="admin-doctor-form">
              <select value={newDoctor.title} onChange={(e) => setNewDoctor(curr => ({ ...curr, title: e.target.value }))}>
                <option value="Dr.">Dr.</option>
                <option value="Dra.">Dra.</option>
              </select>
              <input value={newDoctor.firstName} onChange={(e) => setNewDoctor(curr => ({ ...curr, firstName: e.target.value }))} onKeyDown={handleDoctorKeyDown} placeholder="Nombre" />
              <input value={newDoctor.lastName} onChange={(e) => setNewDoctor(curr => ({ ...curr, lastName: e.target.value }))} onKeyDown={handleDoctorKeyDown} placeholder="Apellido" />
              <button type="button" className="button button--secondary" onClick={addDoctor}>Agregar</button>
            </div>
            <div className="admin-chip-list">
              {formState.medicos.map((medico, index) => (
                <span key={`${medico}-${index}`} className="admin-chip">
                  {medico}
                  <button type="button" onClick={() => removeDoctor(index)}>×</button>
                </span>
              ))}
              {formState.medicos.length === 0 && <span className="admin-form__hint">No hay médicos agregados.</span>}
            </div>
          </div>
          <label>
            Horario plano
            <textarea name="textoHorarioPlano" rows="3" value={formState.textoHorarioPlano} onChange={handleFieldChange} placeholder="Lunes a viernes por la mañana..." />
          </label>
          <label>
            Estudio o Servicio Adicional (Ej: Incluye Electrocardiograma)
            <textarea name="estudioIncluido" rows="2" value={formState.estudioIncluido} onChange={handleFieldChange} placeholder="Ej: Eco pélvico / Electrocardiograma" />
          </label>
          <div className="admin-schedule-editor">
            <strong>Horarios por día</strong>
            <div className="admin-schedule-grid">
              {days.map((day) => (
                <article key={day} className="admin-schedule-day">
                  <span>{day}</span>
                  <div>
                    {turnos.map((turno) => (
                      <label key={`${day}-${turno}`} className="admin-form__check admin-form__check--compact">
                        <input type="checkbox" checked={Boolean(formState.cronograma[day]?.[turno])} onChange={() => handleScheduleToggle(day, turno)} />
                        {turno}
                      </label>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="admin-form__actions">
            <button type="submit" className="button button--primary" disabled={saving || !isFormValid}>
              {saving ? "Guardando..." : selectedId && !isCreatingNew ? "Guardar cambios" : "Crear especialidad"}
            </button>
            <button type="button" className="button button--secondary" onClick={deleteCurrent} disabled={!selectedId || isCreatingNew}>Eliminar</button>
          </div>
          {status.message && (
            <p className={`admin-form__status ${status.type === "success" ? "admin-form__status--success" : ""}`}>{status.message}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default AdminEspecialidades;
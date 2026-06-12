import { useEffect, useMemo, useState } from "react";
import { useEspecialidades } from "../hooks/useEspecialidades";
import { specialtyCatalog } from "../data/siteContent";

const iconOptions = [
  { value: "Stethoscope", label: "Estetoscopio" },
  { value: "Heart", label: "Corazón" },
  { value: "Activity", label: "Actividad" },
  { value: "Apple", label: "Manzana" },
  { value: "Brain", label: "Cerebro" },
  { value: "Baby", label: "Bebé" },
  { value: "Bone", label: "Hueso" },
  { value: "Diamond", label: "Diamante" },
  { value: "Droplets", label: "Gotas" },
  { value: "Eye", label: "Ojo" },
  { value: "Ear", label: "Oído" },
  { value: "Filter", label: "Filtro" },
  { value: "FlaskConical", label: "Laboratorio" },
  { value: "Flower2", label: "Flor" },
  { value: "MessageCircle", label: "Diálogo" },
  { value: "Scan", label: "Escáner" },
  { value: "ScanFace", label: "Piel" },
  { value: "Scissors", label: "Tijeras" },
  { value: "Syringe", label: "Jeringa" },
  { value: "Venus", label: "Mujer" },
  { value: "Wind", label: "Viento" },
];

const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
const turnos = ["ma\u00f1ana", "tarde"];

const emptySchedule = () =>
  days.reduce((accumulator, day) => {
    accumulator[day] = { ma\u00f1ana: false, tarde: false };
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
        ma\u00f1ana: Boolean(source.ma\u00f1ana),
        tarde: Boolean(source.tarde),
      };
      return accumulator;
    }

    if (Array.isArray(source)) {
      accumulator[day] = {
        ma\u00f1ana: source.includes("ma\u00f1ana"),
        tarde: source.includes("tarde"),
      };
      return accumulator;
    }

    accumulator[day] = {
      ma\u00f1ana: false,
      tarde: false,
    };

    return accumulator;
  }, {});
};

const AdminEspecialidades = () => {
  const { especialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad } = useEspecialidades();
  const [selectedId, setSelectedId] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    nombre: "",
    icon: "",
    descripcion: "",
    medicoInput: "",
    medicos: [],
    textoHorarioPlano: "",
    estudioIncluido: "",
    cronograma: emptySchedule(),
  });
  const [newDoctor, setNewDoctor] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const catalogToShow = useMemo(() => {
    if (especialidades.length) {
      return especialidades;
    }

    return specialtyCatalog;
  }, [especialidades]);

  useEffect(() => {
    if (!catalogToShow.length || isCreatingNew) {
      return;
    }

    const item = catalogToShow.find((entry) => entry.id === selectedId) || catalogToShow[0];

    setSelectedId(item.id);
    setFormState({
      id: item.id || "",
      nombre: item.nombre || "",
      icon: item.icon || "",
      descripcion: item.descripcion || "",
      medicoInput: "",
      medicos: item.medicos || [],
      textoHorarioPlano: item.textoHorarioPlano || "",
      estudioIncluido: item.estudioIncluido || "",
      cronograma: buildScheduleFromData(item),
    });
  }, [catalogToShow, selectedId, isCreatingNew]);

  const handleSelect = (id) => {
    setIsCreatingNew(false);
    setSelectedId(id);
    setMessage("");
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
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
    const doctor = newDoctor.trim();
    if (!doctor) {
      return;
    }

    setFormState((current) => ({
      ...current,
      medicos: [...current.medicos, doctor],
    }));
    setNewDoctor("");
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
      descripcion: "",
      medicoInput: "",
      medicos: [],
      textoHorarioPlano: "",
      estudioIncluido: "",
      cronograma: emptySchedule(),
    });
    setMessage("Creando especialidad nueva.");
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const id = formState.id.trim() || normalizeId(formState.nombre);

    if (!id || !formState.nombre.trim()) {
      setMessage("El nombre y el ID son obligatorios.");
      return;
    }

    const payload = {
      nombre: formState.nombre.trim(),
      icon: formState.icon,
      descripcion: formState.descripcion.trim(),
      medicos: formState.medicos,
      textoHorarioPlano: formState.textoHorarioPlano.trim(),
      estudioIncluido: formState.estudioIncluido.trim(),
      cronograma: formState.cronograma,
    };

    setSaving(true);
    setMessage("");

    try {
      const existing = especialidades.find((item) => item.id === id);

      if (existing) {
        await updateEspecialidad(id, payload);
        setMessage("Especialidad actualizada correctamente.");
      } else {
        await createEspecialidad(id, payload);
        setIsCreatingNew(false);
        setSelectedId(id);
        setMessage("Especialidad creada correctamente.");
      }
    } catch (error) {
      console.error(error);
      setMessage("No fue posible guardar la especialidad.");
    } finally {
      setSaving(false);
    }
  };

  const deleteCurrent = async () => {
    if (!selectedId) {
      return;
    }

    if (!window.confirm(`\u00bfEst\u00e1s seguro de eliminar "${formState.nombre}"? Esta acci\u00f3n no se puede deshacer.`)) {
      return;
    }

    try {
      await deleteEspecialidad(selectedId);
      setMessage("Especialidad eliminada.");
      setIsCreatingNew(false);
      resetForm();
    } catch (error) {
      console.error(error);
      setMessage("No fue posible eliminar la especialidad.");
    }
  };

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-card__header">
        <div>
          <span className="section-kicker section-kicker--neutral">CRUD Especialidades</span>
          <h2>Crear, editar y eliminar</h2>
        </div>
        <button type="button" className="button button--secondary" onClick={resetForm}>
          Nueva especialidad
        </button>
      </div>

      <div className="admin-split admin-split--wide">
        <aside className="admin-list admin-list--scroll">
          {catalogToShow.map((item) => (
            <button
              key={item.id}
              type="button"
              className={selectedId === item.id ? "admin-list__item admin-list__item--active" : "admin-list__item"}
              onClick={() => handleSelect(item.id)}
            >
              <strong>{item.nombre}</strong>
              <span>{(item.medicos || []).join(" \u00b7 ") || "Sin m\u00e9dicos"}</span>
            </button>
          ))}
        </aside>

        <form className="admin-form admin-form--grid" onSubmit={submitForm}>
          <label>
            ID de documento
            <input name="id" value={formState.id} onChange={handleFieldChange} placeholder="cardiologia-general" />
          </label>

          <label>
            Nombre de la especialidad
            <input name="nombre" value={formState.nombre} onChange={handleFieldChange} placeholder="Cardiolog\u00eda" />
          </label>

          <label>
            Icono representativo
            <select name="icon" value={formState.icon} onChange={handleFieldChange}>
              <option value="">Seleccionar icono...</option>
              {iconOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>

          <label>
            Descripci\u00f3n
            <textarea
              name="descripcion"
              rows="3"
              value={formState.descripcion}
              onChange={handleFieldChange}
              placeholder="Breve descripci\u00f3n de la especialidad..."
            />
          </label>

          <div className="admin-doctors">
            <label>
              Agregar m\u00e9dico
              <div className="admin-inline-input">
                <input value={newDoctor} onChange={(event) => setNewDoctor(event.target.value)} placeholder="Nombre del m\u00e9dico" />
                <button type="button" className="button button--secondary" onClick={addDoctor}>
                  Agregar
                </button>
              </div>
            </label>

            <div className="admin-chip-list">
              {formState.medicos.map((medico, index) => (
                <span key={`${medico}-${index}`} className="admin-chip">
                  {medico}
                  <button type="button" onClick={() => removeDoctor(index)} aria-label={`Eliminar ${medico}`}>
                    \u00d7
                  </button>
                </span>
              ))}
            </div>
          </div>

          <label>
            Horario plano
            <textarea
              name="textoHorarioPlano"
              rows="3"
              value={formState.textoHorarioPlano}
              onChange={handleFieldChange}
              placeholder="Lunes a viernes por la ma\u00f1ana y la tarde."
            />
          </label>

          <label>
            Estudio incluido
            <textarea
              name="estudioIncluido"
              rows="3"
              value={formState.estudioIncluido}
              onChange={handleFieldChange}
              placeholder="Consulta + electrocardiograma"
            />
          </label>

          <div className="admin-schedule-editor">
            <strong>Horarios por d\u00eda</strong>
            <div className="admin-schedule-grid">
              {days.map((day) => (
                <article key={day} className="admin-schedule-day">
                  <span>{day}</span>
                  <div>
                    {turnos.map((turno) => (
                      <label key={`${day}-${turno}`} className="admin-form__check admin-form__check--compact">
                        <input
                          type="checkbox"
                          checked={Boolean(formState.cronograma[day]?.[turno])}
                          onChange={() => handleScheduleToggle(day, turno)}
                        />
                        {turno}
                      </label>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="admin-form__actions">
            <button type="submit" className="button button--primary" disabled={saving}>
              {saving ? "Guardando..." : selectedId ? "Guardar cambios" : "Crear especialidad"}
            </button>
            <button type="button" className="button button--secondary" onClick={deleteCurrent} disabled={!selectedId}>
              Eliminar
            </button>
          </div>

          {message ? <p className="admin-form__status">{message}</p> : null}
        </form>
      </div>
    </section>
  );
};

export default AdminEspecialidades;
import { useEffect, useMemo, useState } from "react";
import { useEspecialidades } from "../hooks/useEspecialidades";
import { specialtyCatalog } from "../data/siteContent";

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
  const [formState, setFormState] = useState({
    id: "",
    nombre: "",
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
              <span>{(item.medicos || []).join(" · ") || "Sin médicos"}</span>
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
            <input name="nombre" value={formState.nombre} onChange={handleFieldChange} placeholder="Cardiología" />
          </label>

          <div className="admin-doctors">
            <label>
              Agregar médico
              <div className="admin-inline-input">
                <input value={newDoctor} onChange={(event) => setNewDoctor(event.target.value)} placeholder="Nombre del médico" />
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
                    ×
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
              placeholder="Lunes a viernes por la mañana y la tarde."
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
            <strong>Horarios por día</strong>
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
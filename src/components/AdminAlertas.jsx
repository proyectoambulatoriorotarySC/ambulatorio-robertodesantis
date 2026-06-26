import { useState } from "react";
import { useConfiguracion } from "../hooks/useConfiguracion";

const defaultState = {
  avisoActivo: false,
  textoAviso: "",
  telefonoContacto: "",
  whatsappContacto: "",
  mensajePredefinido: "",
  horarioGeneral: "",
  direccionFisica: "",
  serviciosAdicionales: [],
};

const AdminAlertas = () => {
  const { configuracion, updateConfiguracion } = useConfiguracion();
  const [formState, setFormState] = useState(defaultState);
  const [newService, setNewService] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const [prevConfiguracion, setPrevConfiguracion] = useState(null);

  if (configuracion !== prevConfiguracion) {
    setPrevConfiguracion(configuracion);
    if (configuracion) {
      setFormState({
        avisoActivo: Boolean(configuracion.avisoActivo),
        textoAviso: configuracion.textoAviso || "",
        telefonoContacto: configuracion.telefonoContacto || "",
        whatsappContacto: configuracion.whatsappContacto || "",
        mensajePredefinido: configuracion.mensajePredefinido || "Hola, quisiera solicitar información sobre las consultas.",
        horarioGeneral: configuracion.horarioGeneral || "",
        direccionFisica: configuracion.direccionFisica || "",
        serviciosAdicionales: configuracion.serviciosAdicionales || [],
      });
    }
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addService = () => {
    const service = newService.trim();
    if (!service) return;
    if (formState.serviciosAdicionales.includes(service)) {
      setStatus({ type: "error", message: "Este servicio ya existe." });
      return;
    }
    setFormState(prev => ({
      ...prev,
      serviciosAdicionales: [...prev.serviciosAdicionales, service]
    }));
    setNewService("");
  };

  const removeService = (index) => {
    setFormState(prev => ({
      ...prev,
      serviciosAdicionales: prev.serviciosAdicionales.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "", message: "" });

    try {
      await updateConfiguracion(formState);
      setStatus({ type: "success", message: "Configuración actualizada correctamente." });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "No fue posible guardar la configuración." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-card__header">
        <div>
          <span className="section-kicker">Configuración Global</span>
          <h2>Datos Institucionales y Contacto</h2>
        </div>
        <p>Edita la información general y los canales de redirección a WhatsApp.</p>
      </div>

      <form className="admin-form admin-form--grid" onSubmit={handleSubmit}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="admin-form__check admin-toggle">
            <input type="checkbox" name="avisoActivo" checked={formState.avisoActivo} onChange={handleChange} />
            <span>Mostrar banner de aviso en el encabezado público</span>
          </label>
        </div>

        <label style={{ gridColumn: "1 / -1" }}>
          Texto del banner
          <textarea name="textoAviso" rows="3" value={formState.textoAviso} onChange={handleChange} placeholder="Ej: Jornada de vacunación este viernes..." />
        </label>

        <label>
          Teléfono de contacto (Visual)
          <input name="telefonoContacto" value={formState.telefonoContacto} onChange={handleChange} placeholder="Ej: 0414-191-5455" />
        </label>

        <label>
          Número de WhatsApp (Solo números)
          <input name="whatsappContacto" value={formState.whatsappContacto} onChange={handleChange} placeholder="Ej: 584141915455" />
          <span className="admin-form__hint" style={{fontSize: '0.75rem', fontWeight: 'normal'}}>Incluye código de país sin el signo + (Ej: 58 para Venezuela).</span>
        </label>

        <label style={{ gridColumn: "1 / -1" }}>
          Mensaje predefinido de WhatsApp
          <input name="mensajePredefinido" value={formState.mensajePredefinido} onChange={handleChange} placeholder="Ej: Hola, quisiera información sobre..." />
        </label>

        <label style={{ gridColumn: "1 / -1" }}>
          Horario General
          <input name="horarioGeneral" value={formState.horarioGeneral} onChange={handleChange} placeholder="Ej: Lunes a Viernes (7:30am - 3:00pm)" />
        </label>

        <label style={{ gridColumn: "1 / -1" }}>
          Dirección Física
          <textarea name="direccionFisica" rows="2" value={formState.direccionFisica} onChange={handleChange} placeholder="Dirección completa del ambulatorio..." />
        </label>

        <div className="admin-doctors" style={{ gridColumn: "1 / -1" }}>
          <label>Servicios de Apoyo (Ecos, Biopsias, etc.)</label>
          <div className="admin-inline-input">
            <input 
              value={newService} 
              onChange={(e) => setNewService(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
              placeholder="Ej: Eco Doppler" 
            />
            <button type="button" className="button button--secondary" onClick={addService}>
              Agregar
            </button>
          </div>
          <div className="admin-chip-list" style={{ marginTop: "0.5rem" }}>
            {formState.serviciosAdicionales.map((service, index) => (
              <span key={index} className="admin-chip">
                {service}
                <button type="button" onClick={() => removeService(index)}>×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios globales"}
          </button>
          {status.message ? (
            <p className={`admin-form__status ${status.type === "success" ? "admin-form__status--success" : ""}`}>
              {status.message}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
};

export default AdminAlertas;
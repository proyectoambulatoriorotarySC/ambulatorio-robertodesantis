import { useEffect, useState } from "react";
import { useConfiguracion } from "../hooks/useConfiguracion";

const defaultState = {
  avisoActivo: false,
  textoAviso: "",
};

const AdminAlertas = () => {
  const { configuracion, updateConfiguracion } = useConfiguracion();
  const [formState, setFormState] = useState(defaultState);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!configuracion) {
      return;
    }

    setFormState({
      avisoActivo: Boolean(configuracion.avisoActivo),
      textoAviso: configuracion.textoAviso || "",
    });
  }, [configuracion]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateConfiguracion({
        avisoActivo: formState.avisoActivo,
        textoAviso: formState.textoAviso,
      });
      setMessage("Aviso actualizado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("No fue posible guardar el aviso.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-card__header">
        <div>
          <span className="section-kicker">Control de Alertas</span>
          <h2>Banner institucional</h2>
        </div>
        <p>Activa o desactiva el aviso con un clic y edita el texto en tiempo real.</p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-form__check admin-toggle">
          <input type="checkbox" name="avisoActivo" checked={formState.avisoActivo} onChange={handleChange} />
          <span>Mostrar aviso en el encabezado público</span>
        </label>

        <label>
          Texto del banner
          <textarea name="textoAviso" rows="4" value={formState.textoAviso} onChange={handleChange} />
        </label>

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={saving}>
            {saving ? "Guardando..." : "Guardar alerta"}
          </button>
          {message ? <p className="admin-form__status">{message}</p> : null}
        </div>
      </form>
    </section>
  );
};

export default AdminAlertas;
import { useMemo, useState } from "react";
import { useConfiguracion } from "../hooks/useConfiguracion";
import { consultationPackages } from "../data/siteContent";

const emptyPackage = {
  title: "",
  detail: "",
};

const AdminConsultaForm = ({ initialData, onSave, onDelete, isSaving, canDelete }) => {
  const [formState, setFormState] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formState);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label>
        Título del paquete
        <input name="title" value={formState.title} onChange={handleChange} required />
      </label>

      <label>
        Descripción
        <textarea name="detail" rows="6" value={formState.detail} onChange={handleChange} />
      </label>

      <div className="admin-form__actions">
        <button type="submit" className="button button--primary" disabled={isSaving}>
          {isSaving ? "Guardando..." : "Guardar paquete"}
        </button>
        <button
          type="button"
          className="button button--secondary"
          onClick={onDelete}
          disabled={!canDelete || isSaving}
        >
          Eliminar
        </button>
      </div>
    </form>
  );
};

const AdminConsultas = () => {
  const { configuracion, updateConfiguracion } = useConfiguracion();
  const [editingIndex, setEditingIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const items = useMemo(
    () => configuracion?.consultasIntegrales || consultationPackages,
    [configuracion]
  );

  const safeIndex = Math.min(editingIndex, Math.max(0, items.length - 1));
  const currentItem = items[safeIndex] || emptyPackage;

  const handleSelect = (index) => {
    setEditingIndex(index);
    setMessage("");
  };

  const handleSave = async (updatedPackage) => {
    if (!updatedPackage.title.trim()) {
      setMessage("El título del paquete es obligatorio.");
      return;
    }

    const nextItems = [...items];
    nextItems[safeIndex] = {
      title: updatedPackage.title.trim(),
      detail: updatedPackage.detail.trim(),
    };

    setSaving(true);
    setMessage("");

    try {
      await updateConfiguracion({ consultasIntegrales: nextItems });
      setMessage("Paquete actualizado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("No fue posible guardar el paquete.");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    const nextItems = [...items, { ...emptyPackage }];
    setSaving(true);
    setMessage("");

    try {
      await updateConfiguracion({ consultasIntegrales: nextItems });
      setEditingIndex(nextItems.length - 1);
      setMessage("Nuevo paquete listo para editar.");
    } catch (error) {
      console.error(error);
      setMessage("No fue posible agregar el paquete.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const nextItems = items.filter((_, index) => index !== safeIndex);
    setSaving(true);
    setMessage("");

    try {
      await updateConfiguracion({ consultasIntegrales: nextItems });
      setEditingIndex(Math.max(0, safeIndex - 1));
      setMessage("Paquete eliminado.");
    } catch (error) {
      console.error(error);
      setMessage("No fue posible eliminar el paquete.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-card__header">
        <div>
          <span className="section-kicker section-kicker--gold">Gestión de Consultas Integrales</span>
          <h2>Paquetes editables</h2>
        </div>
        <button type="button" className="button button--secondary" onClick={handleAdd} disabled={saving}>
          Agregar paquete
        </button>
      </div>

      <div className="admin-split">
        <aside className="admin-list">
          {items.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              className={safeIndex === index ? "admin-list__item admin-list__item--active" : "admin-list__item"}
              onClick={() => handleSelect(index)}
            >
              <strong>{item.title || "Nuevo paquete"}</strong>
              <span>{item.detail || "Sin descripción"}</span>
            </button>
          ))}
        </aside>

        <div style={{ flex: 1 }}>
          <AdminConsultaForm
            key={`${safeIndex}-${currentItem.title}`}
            initialData={currentItem}
            onSave={handleSave}
            onDelete={handleDelete}
            isSaving={saving}
            canDelete={items.length > 0}
          />
          {message ? <p className="admin-form__status" style={{ marginTop: "1rem" }}>{message}</p> : null}
        </div>
      </div>
    </section>
  );
};

export default AdminConsultas;
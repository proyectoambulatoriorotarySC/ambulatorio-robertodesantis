import { useMemo, useState } from "react";
import { useConfiguracion } from "../hooks/useConfiguracion";
import { consultationPackages } from "../data/siteContent";

const emptyPackage = {
  title: "",
  detail: "",
};

const AdminConsultas = () => {
  const { configuracion, updateConfiguracion } = useConfiguracion();
  const [items, setItems] = useState(consultationPackages);
  const [editingIndex, setEditingIndex] = useState(0);
  const [formState, setFormState] = useState(emptyPackage);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const sourceItems = useMemo(() => configuracion?.consultasIntegrales || consultationPackages, [configuracion]);

  const [prevSourceItems, setPrevSourceItems] = useState(null);
  const [prevItems, setPrevItems] = useState(null);
  const [prevEditingIndex, setPrevEditingIndex] = useState(null);

  let currentItems = items;

  if (sourceItems !== prevSourceItems) {
    setPrevSourceItems(sourceItems);
    setItems(sourceItems);
    currentItems = sourceItems;
  }

  if (currentItems !== prevItems || editingIndex !== prevEditingIndex) {
    setPrevItems(currentItems);
    setPrevEditingIndex(editingIndex);

    if (!currentItems.length) {
      if (editingIndex !== 0) {
        setEditingIndex(0);
      }
      setFormState(emptyPackage);
    } else {
      const targetIndex = Math.min(editingIndex, currentItems.length - 1);
      if (editingIndex !== targetIndex) {
        setEditingIndex(targetIndex);
      }
      const current = currentItems[targetIndex];
      setFormState(current || emptyPackage);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSelect = (index) => {
    setEditingIndex(index);
    setMessage("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!formState.title.trim()) {
      setMessage("El título del paquete es obligatorio.");
      return;
    }

    const nextItems = [...items];
    nextItems[editingIndex] = {
      title: formState.title.trim(),
      detail: formState.detail.trim(),
    };

    setSaving(true);
    setMessage("");

    try {
      await updateConfiguracion({ consultasIntegrales: nextItems });
      setItems(nextItems);
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
      setItems(nextItems);
      setEditingIndex(nextItems.length - 1);
      setMessage("Nuevo paquete listo para editar.");
    } catch (error) {
      console.error(error);
      setMessage("No fue posible agregar el paquete.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index) => {
    const nextItems = items.filter((_, currentIndex) => currentIndex !== index);
    setSaving(true);
    setMessage("");

    try {
      await updateConfiguracion({ consultasIntegrales: nextItems });
      setItems(nextItems);
      setEditingIndex(0);
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
        <button type="button" className="button button--secondary" onClick={handleAdd}>
          Agregar paquete
        </button>
      </div>

      <div className="admin-split">
        <aside className="admin-list">
          {items.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              className={editingIndex === index ? "admin-list__item admin-list__item--active" : "admin-list__item"}
              onClick={() => handleSelect(index)}
            >
              <strong>{item.title || "Nuevo paquete"}</strong>
              <span>{item.detail || "Sin descripción"}</span>
            </button>
          ))}
        </aside>

        <form className="admin-form" onSubmit={handleSave}>
          <label>
            Título del paquete
            <input name="title" value={formState.title} onChange={handleChange} />
          </label>

          <label>
            Descripción
            <textarea name="detail" rows="6" value={formState.detail} onChange={handleChange} />
          </label>

          <div className="admin-form__actions">
            <button type="submit" className="button button--primary" disabled={saving}>
              {saving ? "Guardando..." : "Guardar paquete"}
            </button>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => handleDelete(editingIndex)}
              disabled={!items.length}
            >
              Eliminar
            </button>
          </div>

          {message ? <p className="admin-form__status">{message}</p> : null}
        </form>
      </div>
    </section>
  );
};

export default AdminConsultas;
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { useConfiguracion } from "../hooks/useConfiguracion";
import { useEspecialidades } from "../hooks/useEspecialidades";
import { authService } from "../services/authService";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { configuracion, updateConfiguracion } = useConfiguracion();
  const { especialidades } = useEspecialidades();
  const [formState, setFormState] = useState({
    avisoActivo: false,
    textoAviso: "",
    telefonoContacto: "",
    horarioGeneral: "",
    direccionFisica: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!configuracion) {
      return;
    }

    setFormState({
      avisoActivo: Boolean(configuracion.avisoActivo),
      textoAviso: configuracion.textoAviso || "",
      telefonoContacto: configuracion.telefonoContacto || "",
      horarioGeneral: configuracion.horarioGeneral || "",
      direccionFisica: configuracion.direccionFisica || "",
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
    setStatus("");

    try {
      await updateConfiguracion(formState);
      setStatus("Configuración actualizada correctamente.");
    } catch (error) {
      setStatus("No fue posible guardar la configuración.");
      console.error(error);
    }
  };

  return (
    <div className="app-shell app-shell--admin">
      <Header />

      <main className="admin-page">
        <section className="admin-hero">
          <div>
            <span className="section-kicker section-kicker--neutral">Panel Administrativo</span>
            <h1>Bienvenido, {user?.email}</h1>
            <p>Desde aquí puedes administrar la información pública del ambulatorio sin tocar el backend manualmente.</p>
          </div>

          <button type="button" className="button button--secondary" onClick={() => authService.logout()}>
            Cerrar sesión
          </button>
        </section>

        <section className="admin-stats">
          <article>
            <strong>{especialidades.length}</strong>
            <span>Especialidades cargadas</span>
          </article>
          <article>
            <strong>{configuracion?.avisoActivo ? "Activo" : "Inactivo"}</strong>
            <span>Estado del aviso principal</span>
          </article>
          <article>
            <strong>{configuracion?.telefonoContacto || "—"}</strong>
            <span>Teléfono de contacto</span>
          </article>
        </section>

        <section className="admin-grid">
          <form className="admin-form" onSubmit={handleSubmit}>
            <span className="section-kicker">Configuración global</span>
            <h2>Editar aviso y contacto</h2>

            <label className="admin-form__check">
              <input type="checkbox" name="avisoActivo" checked={formState.avisoActivo} onChange={handleChange} />
              Mostrar aviso en la cabecera
            </label>

            <label>
              Texto del aviso
              <textarea name="textoAviso" rows="4" value={formState.textoAviso} onChange={handleChange} />
            </label>

            <label>
              Teléfono de contacto
              <input name="telefonoContacto" value={formState.telefonoContacto} onChange={handleChange} />
            </label>

            <label>
              Horario general
              <input name="horarioGeneral" value={formState.horarioGeneral} onChange={handleChange} />
            </label>

            <label>
              Dirección física
              <textarea name="direccionFisica" rows="3" value={formState.direccionFisica} onChange={handleChange} />
            </label>

            {status ? <p className="admin-form__status">{status}</p> : null}

            <button type="submit" className="button button--primary">Guardar cambios</button>
          </form>

          <div className="admin-preview">
            <span className="section-kicker section-kicker--gold">Vista previa pública</span>
            <h2>{configuracion?.textoAviso || "Sin aviso activo"}</h2>
            <p>{configuracion?.horarioGeneral}</p>
            <p>{configuracion?.direccionFisica}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
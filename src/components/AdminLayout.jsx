const sections = [
  { id: "alertas", label: "Alertas" },
  { id: "especialidades", label: "Especialidades" },
  { id: "consultas", label: "Consultas Integrales" },
];

const AdminLayout = ({ userEmail, activeSection, onSectionChange, onLogout, children, summaryCards = [] }) => {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__eyebrow">Panel Administrativo</span>
          <strong>Ambulatorio Roberto De Santis</strong>
          <span>{userEmail}</span>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Secciones administrativas">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={activeSection === section.id ? "admin-sidebar__item admin-sidebar__item--active" : "admin-sidebar__item"}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <button type="button" className="button button--secondary admin-sidebar__logout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-content__header">
          <div>
            <span className="section-kicker section-kicker--neutral">Administración</span>
            <h1>Gestión del sitio y catálogo médico</h1>
            <p>Usa el panel para actualizar contenido público, horarios y paquetes editables desde Firestore.</p>
          </div>

          <div className="admin-content__summary">
            {summaryCards.map((card) => (
              <article key={card.label} className="admin-summary-card">
                <strong>{card.value}</strong>
                <span>{card.label}</span>
              </article>
            ))}
          </div>
        </header>

        <section className="admin-content__body">{children}</section>
      </main>
    </div>
  );
};

export default AdminLayout;
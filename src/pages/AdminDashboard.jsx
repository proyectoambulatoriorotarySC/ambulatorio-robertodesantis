import { useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useConfiguracion } from "../hooks/useConfiguracion";
import { useEspecialidades } from "../hooks/useEspecialidades";
import { authService } from "../services/authService";
import { mockConfiguracionGlobal } from "../data/mockData";
import AdminLayout from "../components/AdminLayout";
import AdminAlertas from "../components/AdminAlertas";
import AdminEspecialidades from "../components/AdminEspecialidades";
import AdminConsultas from "../components/AdminConsultas";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { configuracion } = useConfiguracion();
  const { especialidades } = useEspecialidades();
  const [activeSection, setActiveSection] = useState("alertas");

  const summaryCards = useMemo(
    () => [
      { label: "Especialidades", value: especialidades.length },
      { label: "Aviso activo", value: (configuracion ?? mockConfiguracionGlobal).avisoActivo ? "Sí" : "No" },
      { label: "Consultas editables", value: (configuracion?.consultasIntegrales || mockConfiguracionGlobal.consultasIntegrales || []).length },
    ],
    [configuracion, especialidades.length]
  );

  const renderSection = () => {
    if (activeSection === "especialidades") {
      return <AdminEspecialidades />;
    }

    if (activeSection === "consultas") {
      return <AdminConsultas />;
    }

    return <AdminAlertas />;
  };

  return (
    <div className="app-shell app-shell--admin">
      <AdminLayout
        userEmail={user?.email || "admin"}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={() => authService.logout()}
        summaryCards={summaryCards}
      >
        {renderSection()}
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
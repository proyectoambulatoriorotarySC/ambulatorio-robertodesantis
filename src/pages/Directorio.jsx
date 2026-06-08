import { useConfiguracion } from "../hooks/useConfiguracion";
import { mockConfiguracionGlobal } from "../data/mockData";
import ConsultasIntegrales from "../components/ConsultasIntegrales";

const Directorio = () => {
  const { configuracion } = useConfiguracion();
  const config = configuracion ?? mockConfiguracionGlobal;

  return (
    <ConsultasIntegrales configuracion={config} />
  );
};

export default Directorio;

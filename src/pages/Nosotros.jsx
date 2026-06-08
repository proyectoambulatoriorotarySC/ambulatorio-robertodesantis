import { useConfiguracion } from "../hooks/useConfiguracion";
import { mockConfiguracionGlobal } from "../data/mockData";
import MisionVision from "../components/MisionVision";
import MapaUbicacion from "../components/MapaUbicacion";

const Nosotros = () => {
  const { configuracion } = useConfiguracion();
  const config = configuracion ?? mockConfiguracionGlobal;

  return (
    <>
      <MisionVision configuracion={config} />
      <MapaUbicacion configuracion={config} />
    </>
  );
};

export default Nosotros;

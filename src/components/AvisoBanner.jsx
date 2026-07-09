import { useConfiguracion } from "../hooks/useConfiguracion";
import { mockConfiguracionGlobal } from "../data/mockData";

const AvisoBanner = () => {
  const { configuracion } = useConfiguracion();
  const aviso = configuracion ?? mockConfiguracionGlobal;

  const isActive = aviso?.avisoActivo && aviso?.textoAviso;

  return (
    <div className={`aviso-banner ${isActive ? "" : "aviso-banner--hidden"}`} role="status" aria-live="polite">
      <span className="aviso-banner__tag">AVISO</span>
      <p>{aviso.textoAviso || ""}</p>
    </div>
  );
};

export default AvisoBanner;
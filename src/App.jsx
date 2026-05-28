// src/App.jsx
import { useEffect, useState } from "react";
import { especialidadesService } from "./services/especialidadesService";
import { configuracionService } from "./services/configuracionService";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const probarServicios = async () => {
      try {
        console.log("🚀 Iniciando pruebas de la capa de servicios...");

        // 1. Probar Servicio de Configuración
        console.log("⏳ Solicitando configuración global...");
        const configGlobal = await configuracionService.getGlobal();
        console.log("✅ Configuración global recibida de Firebase:", configGlobal);

        // 2. Probar Servicio de Especialidades
        console.log("⏳ Solicitando lista de especialidades...");
        const listaEspecialidades = await especialidadesService.getAll();
        console.log("✅ Especialidades recibidas de Firebase:", listaEspecialidades);

        setLoading(false);
      } catch (err) {
        console.error("❌ Error detectado en la prueba:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    probarServicios();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🧪 Consola de Pruebas de Servicios</h1>
      <p>Abre la consola del navegador presionando <b>F12</b> o clic derecho - Inspeccionar.</p>
      
      {loading && <p style={{ color: "orange" }}>⏳ Consultando a Firebase...</p>}
      
      {error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>❌ Error: {error}</p>
      ) : (
        !loading && <p style={{ color: "green", fontWeight: "bold" }}>🎉 ¡Prueba completada con éxito! Revisa la consola.</p>
      )}
    </div>
  );
}

export default App;
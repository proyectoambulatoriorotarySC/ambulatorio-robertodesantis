// src/hooks/useConfiguracion.js
import { useState, useEffect } from "react";
import { configuracionService } from "../services/configuracionService";

export const useConfiguracion = () => {
  const [configuracion, setConfiguracion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reloadTrigger, setReloadTrigger] = useState(0);
  const refetchConfiguracion = () => setReloadTrigger((prev) => prev + 1);

  // 1. READ - Obtener la configuración global de forma segura
  useEffect(() => {
    let isMounted = true; 

    const cargarConfiguracion = async () => {
      try {
        if (isMounted) {
          setIsLoading(true);
          setError(null);
        }
        const data = await configuracionService.getGlobal();
        if (isMounted) {
          setConfiguracion(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Error al cargar la configuración global del ambulatorio.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    cargarConfiguracion();

    return () => {
      isMounted = false; 
    };
  }, [reloadTrigger]);

  // 2. UPDATE - Modificar datos desde el panel /admin (Avisos, teléfonos, servicios, etc.)
  const updateConfiguracion = async (nuevosDatos) => {
    try {
      await configuracionService.updateGlobal(nuevosDatos);

      setConfiguracion((prev) => ({
        ...prev,
        ...nuevosDatos,
      }));
    } catch (err) {
      console.error(err);
      throw new Error("Error al actualizar los datos de configuración global.", { cause: err });
    }
  };

  return {
    configuracion,
    isLoading,
    error,
    updateConfiguracion,
    refetchConfiguracion,
  };
};
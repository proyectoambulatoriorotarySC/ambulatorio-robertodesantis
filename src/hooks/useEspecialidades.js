// src/hooks/useEspecialidades.js
import { useState, useEffect } from "react";
import { especialidadesService } from "../services/especialidadesService";

export const useEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reloadTrigger, setReloadTrigger] = useState(0);
  const refetchEspecialidades = () => setReloadTrigger(prev => prev + 1);

  // 1. READ - Obtener todas las especialidades
  useEffect(() => {
    let isMounted = true; 

    const cargarDatos = async () => {
      try {
        if (isMounted) {
          setIsLoading(true);
          setError(null);
        }
        const data = await especialidadesService.getAll();
        if (isMounted) {
          setEspecialidades(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Error al cargar las especialidades médicas.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    cargarDatos();

    return () => {
      isMounted = false; 
    };
  }, [reloadTrigger]); 

  // 2. CREATE - Crear una especialidad (Desde el panel /admin)
  const createEspecialidad = async (id, especialidadData) => {
    try {
      const nuevaEsp = await especialidadesService.create(id, especialidadData);
      setEspecialidades((prev) => [...prev, nuevaEsp]);
      return nuevaEsp;
    } catch (err) {
      console.error(err);
      throw new Error("Error al registrar la especialidad.", { cause: err });
    }
  };

  // 3. UPDATE - Modificar médicos, horarios o estudios de una especialidad
  const updateEspecialidad = async (id, especialidadData) => {
    try {
      const especialidadActualizada = await especialidadesService.update(id, especialidadData);
      setEspecialidades((prev) =>
        prev.map((esp) => (esp.id === id ? { ...esp, ...especialidadActualizada } : esp))
      );
    } catch (err) {
      console.error(err);
      throw new Error("Error al actualizar la especialidad.", { cause: err });
    }
  };

  // 4. DELETE - Eliminar especialidad
  const deleteEspecialidad = async (id) => {
    try {
      await especialidadesService.delete(id);
      setEspecialidades((prev) => prev.filter((esp) => esp.id !== id));
    } catch (err) {
      console.error(err);
      throw new Error("Error al eliminar la especialidad.", { cause: err });
    }
  };

  return {
    especialidades,
    isLoading,
    error,
    createEspecialidad,
    deleteEspecialidad,
    updateEspecialidad,
    refetchEspecialidades,
  };
};
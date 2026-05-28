// src/services/especialidadesService.js
import { db } from "./firebase"; // Tu instancia de Firestore
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

// Definimos la referencia a la "tabla" (Colección) en Firestore
const coleccionRef = collection(db, "especialidades");

export const especialidadesService = {
  // GET ALL - Obtener las 18 especialidades (Para los pacientes y el buscador)
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(coleccionRef);
      // Mapeamos los documentos de Firebase a un array de objetos JSON común
      return querySnapshot.docs.map(documento => ({
        id: documento.id, // El ID del documento (ej: 'gastroenterologia')
        ...documento.data() // Los campos internos (nombre, medicos, cronograma...)
      }));
    } catch (error) {
      console.error("Error al obtener especialidades:", error);
      throw error;
    }
  },

  // GET BY ID - Buscar una sola (Por si se necesita una vista de detalle)
  getById: async (id) => {
    try {
      const docRef = doc(db, "especialidades", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("La especialidad no existe");
      }
    } catch (error) {
      console.error("Error al obtener especialidad por ID:", error);
      throw error;
    }
  },

  // CREATE - Guardar una nueva desde el panel de administración
  create: async (id, especialidadData) => {
    try {
      // Usamos setDoc especificando el ID para que quede limpio (ej: 'cardiologia')
      const docRef = doc(db, "especialidades", id);
      await setDoc(docRef, especialidadData);
      return { id, ...especialidadData };
    } catch (error) {
      console.error("Error al crear especialidad:", error);
      throw error;
    }
  },

  // UPDATE - Modificar horarios o médicos de una especialidad existente
  update: async (id, especialidadData) => {
    try {
      const docRef = doc(db, "especialidades", id);
      await updateDoc(docRef, especialidadData);
      return { id, ...especialidadData };
    } catch (error) {
      console.error("Error al actualizar especialidad:", error);
      throw error;
    }
  },

  // DELETE - Eliminar una especialidad del directorio
  delete: async (id) => {
    try {
      const docRef = doc(db, "especialidades", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error al eliminar especialidad:", error);
      throw error;
    }
  }
};
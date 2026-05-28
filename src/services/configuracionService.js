// src/services/configuracionService.js
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Apuntamos directamente al documento único 'global' dentro de la colección 'configuracion'
const docRef = doc(db, "configuracion", "global");

export const configuracionService = {
  // GET - Obtener la configuración global (Para pintar el Banner, el Footer y los Servicios Adicionales)
  getGlobal: async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Por si acaso no se ha creado en la consola, retornamos un objeto vacío estructurado
        return {
          avisoActivo: false,
          textoAviso: "",
          telefonoContacto: "",
          horarioGeneral: "",
          direccionFisica: "",
          serviciosAdicionales: []
        };
      }
    } catch (error) {
      console.error("Error al obtener la configuración global de Firestore:", error);
      throw error;
    }
  },

  // UPDATE - Modificar los datos desde el panel /admin (Activar/desactivar avisos, cambiar teléfonos, etc.)
  updateGlobal: async (nuevosDatos) => {
    try {
      // updateDoc solo modifica los campos que le envíes, respetando los demás
      await updateDoc(docRef, nuevosDatos);
      return nuevosDatos;
    } catch (error) {
      console.error("Error al actualizar la configuración global:", error);
      throw error;
    }
  }
};
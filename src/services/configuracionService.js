// src/services/configuracionService.js
import { auth, db } from "./firebase";
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";

// Apuntamos directamente al documento único 'global' dentro de la colección 'configuracion'
const docRef = doc(db, "configuracion", "global");
const auditoriaRef = collection(db, "auditoria");

const registrarAuditoria = async (accion, detalle) => {
  await addDoc(auditoriaRef, {
    accion,
    entidad: "configuracion",
    entidadId: "global",
    detalle,
    usuario: auth.currentUser?.email || "sistema",
    fechaHora: serverTimestamp(),
  });
};

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
          consultasIntegrales: [],
          serviciosAdicionales: []
        };
      }
    } catch (error) {
      console.error("Error al obtener la configuración global de Firestore:", error);
      throw error;
    }
  },

  // SUBSCRIBE - Escucha en tiempo real los cambios del documento global
  subscribeGlobal: (callback, onError) => {
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data());
          return;
        }

        callback({
          avisoActivo: false,
          textoAviso: "",
          telefonoContacto: "",
          horarioGeneral: "",
          direccionFisica: "",
          consultasIntegrales: [],
          serviciosAdicionales: []
        });
      },
      (error) => {
        console.error("Error al escuchar la configuración global de Firestore:", error);
        if (onError) {
          onError(error);
        }
      }
    );
  },

  // UPDATE - Modificar los datos desde el panel /admin (Activar/desactivar avisos, cambiar teléfonos, etc.)
  updateGlobal: async (nuevosDatos) => {
    try {
      // updateDoc solo modifica los campos que le envíes, respetando los demás
      await updateDoc(docRef, nuevosDatos);
      await registrarAuditoria("ACTUALIZAR", "Se actualizó la configuración global");
      return nuevosDatos;
    } catch (error) {
      console.error("Error al actualizar la configuración global:", error);
      throw error;
    }
  }
};
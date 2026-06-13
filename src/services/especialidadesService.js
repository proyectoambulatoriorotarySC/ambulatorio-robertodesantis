// src/services/especialidadesService.js
import { auth, db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

const coleccionRef = collection(db, "especialidades");
const auditoriaRef = collection(db, "auditoria");

const normalizarPayload = (especialidadData) => ({
  ...especialidadData,
  nombre: especialidadData.nombre ?? "",
  icon: especialidadData.icon ?? "",
  descripcion: especialidadData.descripcion ?? "",
  medicos: especialidadData.medicos ?? [],
  textoHorarioPlano: especialidadData.textoHorarioPlano ?? "",
  estudioIncluido: especialidadData.estudioIncluido ?? especialidadData.estudioAdicional ?? especialidadData.estudioOpcional ?? "",
  cronograma: especialidadData.cronograma ?? {},
});

const registrarAuditoria = async ({ accion, entidad, entidadId, detalle }) => {
  try {
    await addDoc(auditoriaRef, {
      accion,
      entidad,
      entidadId,
      detalle,
      usuario: auth.currentUser?.email || "sistema",
      fechaHora: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error silencioso al registrar auditoría:", error);
  }
};

export const especialidadesService = {
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(coleccionRef);
      return querySnapshot.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
      }));
    } catch (error) {
      console.error("Error al obtener especialidades:", error);
      throw error;
    }
  },

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

  create: async (id, especialidadData) => {
    try {
      const docRef = doc(db, "especialidades", id);
      const payload = normalizarPayload(especialidadData);
      await setDoc(docRef, payload);
      await registrarAuditoria({
        accion: "CREAR",
        entidad: "especialidades",
        entidadId: id,
        detalle: "Se creó la especialidad " + payload.nombre || id,
      });
      return { id, ...payload };
    } catch (error) {
      console.error("Error al crear especialidad:", error);
      throw error;
    }
  },

  update: async (id, especialidadData) => {
    try {
      const docRef = doc(db, "especialidades", id);
      const payload = normalizarPayload(especialidadData);
      await updateDoc(docRef, payload);
      await registrarAuditoria({
        accion: "ACTUALIZAR",
        entidad: "especialidades",
        entidadId: id,
        detalle: "Se actualizó la especialidad " + payload.nombre || id,
      });
      return { id, ...payload };
    } catch (error) {
      console.error("Error al actualizar especialidad:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const docRef = doc(db, "especialidades", id);
      await deleteDoc(docRef);
      await registrarAuditoria({
        accion: "ELIMINAR",
        entidad: "especialidades",
        entidadId: id,
        detalle: "Se eliminó la especialidad " + id,
      });
    } catch (error) {
      console.error("Error al eliminar especialidad:", error);
      throw error;
    }
  }
};

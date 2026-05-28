// src/services/authService.js
import { auth } from "./firebase"; // Importamos la instancia que creaste recién
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const authService = {
  // Iniciar sesión en el panel /admin
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Retorna el usuario autenticado
    } catch (error) {
      console.error("Error en el login de Firebase:", error.code);
      throw error; // Lo lanzamos para capturar el mensaje de error en la vista
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  }
};
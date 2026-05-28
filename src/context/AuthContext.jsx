// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; // Exportación limpia al final para que el compilador lo asimile por separado
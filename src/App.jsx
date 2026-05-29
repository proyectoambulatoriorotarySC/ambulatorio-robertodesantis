// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

// Importación de las páginas (cuando las crees en tu carpeta pages)
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { user } = useAuth(); // Estado global de la sesión

  return (
    <BrowserRouter>
      <div className="app-container" style={{ fontFamily: "sans-serif" }}>
        
        {/* Aquí puedes colocar un componente fijo como el <Navbar /> */}
        <header style={{ padding: "15px", background: "#f8f9fa", borderBottom: "1px solid #dee2e6" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Ambulatorio Roberto de Santis</h1>
            {user && <span style={{ color: "green", fontSize: "0.9rem" }}>● Admin: {user.email}</span>}
          </div>
        </header>

        {/* El enrutador que decide qué página mostrar según la URL */}
        <main style={{ minHeight: "70vh", maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          <Routes>
            {/* Ruta Pública para los Pacientes */}
            <Route path="/" element={<div>[Página Home - Buscador de Médicos]</div>} />
            
            {/* Ruta de Acceso para el Personal */}
            <Route path="/login" element={<div>[Página Login - Formulario de Acceso]</div>} />
            
            {/* Ruta del Panel Administrativo */}
            <Route path="/admin" element={<div>[Página Admin - Gestión de Horarios]</div>} />
            
            {/* Ruta de escape por si escriben cualquier cosa loca en la URL (Error 404) */}
            <Route path="*" element={<h2>❌ Error 404: Página no encontrada</h2>} />
          </Routes>
        </main>

        {/* Componente fijo de pie de página */}
        <footer style={{ padding: "15px", background: "#212529", color: "white", textAlign: "center", fontSize: "0.9rem" }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Ambulatorio Roberto de Santis - Servicio Comunitario</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
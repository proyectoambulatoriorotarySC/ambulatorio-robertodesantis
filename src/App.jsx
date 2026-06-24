import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutPublico from "./components/LayoutPublico";
import Home from "./pages/Home";
import Especialidades from "./pages/Especialidades";
import EspecialidadDetalle from "./pages/EspecialidadDetalle";
import Directorio from "./pages/Directorio";
import Servicios from "./pages/Servicios";
import Nosotros from "./pages/Nosotros";
import Galeria from "./pages/Galeria";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Home />} />
          <Route path="/directorio" element={<Especialidades />} />
          <Route path="/directorio/:id" element={<EspecialidadDetalle />} />
          <Route path="/integrales" element={<Directorio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/galeria" element={<Galeria />} />
        </Route>

        <Route path="/login" element={user ? <Navigate to="/admin" replace /> : <Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

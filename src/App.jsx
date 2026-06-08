import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutPublico from "./components/LayoutPublico";
import Home from "./pages/Home";
import Especialidades from "./pages/Especialidades";
import Directorio from "./pages/Directorio";
import Servicios from "./pages/Servicios";
import Nosotros from "./pages/Nosotros";
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
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/directorio" element={<Directorio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/nosotros" element={<Nosotros />} />
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

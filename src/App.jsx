import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPublico from "./components/LayoutPublico";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner";

const Especialidades = lazy(() => import("./pages/Especialidades"));
const EspecialidadDetalle = lazy(() => import("./pages/EspecialidadDetalle"));
const Directorio = lazy(() => import("./pages/Directorio"));
const Servicios = lazy(() => import("./pages/Servicios"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const Galeria = lazy(() => import("./pages/Galeria"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <main className="route-loading">
            <LoadingSpinner message="Cargando..." />
          </main>
        }
      >
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

          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

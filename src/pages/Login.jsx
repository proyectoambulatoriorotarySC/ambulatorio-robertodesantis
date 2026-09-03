import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [loading, navigate, redirectTo, user]);

  if (loading) {
    return (
      <main className="route-loading">
        <LoadingSpinner message="Verificando sesión..." />
      </main>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await authService.login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (loginError) {
      const code = loginError?.code;

      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        setError("Correo o contraseña incorrectos.");
      } else if (code === "auth/invalid-email") {
        setError("El correo no tiene un formato válido.");
      } else {
        setError("No se pudo iniciar sesión. Verifica tus credenciales.");
      }
      console.error(loginError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-shell app-shell--auth">
      <Header />

      <main className="auth-page">
        <section className="auth-card">
          <span className="section-kicker">Acceso Administrativo</span>
          <h1>Inicia sesión para gestionar contenidos</h1>
          <p>
            El acceso al panel usa Firebase Auth. Cuando entres, podrás editar la configuración global y revisar el catálogo.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Correo electrónico
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>

            <label>
              Contraseña
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>

            {error ? <p className="auth-form__error">{error}</p> : null}

            <button type="submit" disabled={isSubmitting} className="button button--primary button--full">
              {isSubmitting ? "Ingresando..." : "Entrar al panel"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
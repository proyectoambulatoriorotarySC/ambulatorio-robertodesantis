import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <span className="section-kicker section-kicker--neutral">404</span>
        <h1>Página no encontrada</h1>
        <p>La ruta solicitada no existe. Puedes volver al inicio o acceder al panel si tienes credenciales.</p>
        <Link to="/" className="button button--primary">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
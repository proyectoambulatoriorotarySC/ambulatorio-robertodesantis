import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { heroImages } from "../data/siteContent";

const HeroSection = ({ hero, configuracion }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const whatsappNumber = configuracion?.whatsappContacto?.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(configuracion?.mensajePredefinido || "Hola, quisiera solicitar información.");
  const contactHref = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `tel:${configuracion?.telefonoContacto?.replace(/[^0-9]/g, "") || "04141915455"}`;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="hero-section">
      <div className="hero-carousel" aria-hidden="true">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`hero-carousel__slide ${i === currentSlide ? "hero-carousel__slide--active" : ""}`}
            style={{ backgroundImage: `url(${img.src})` }}
          />
        ))}
      </div>
      <div className="hero-section__overlay" aria-hidden="true" />
      <div className="hero-section__content">
        <span className="section-kicker section-kicker--hero">{hero.eyebrow}</span>
        <h1>{hero.title}</h1>
        <p>{hero.summary}</p>

        <div className="hero-section__actions">
          <Link to="/directorio" className="button button--primary">
            Ver Directorio
          </Link>
          <a 
            href={contactHref} 
            className="button button--secondary"
            target={whatsappNumber ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {whatsappNumber ? "Enviar WhatsApp" : "Llamar al ambulatorio"}
          </a>
        </div>
      </div>

      <aside className="hero-section__card">
        <strong>Atención comunitaria</strong>
        <p>{configuracion?.horarioGeneral || "Lunes a viernes de 7:30 am a 3:00 pm"}</p>
        <span>{configuracion?.direccionFisica || "Ventuari, Puerto Ordaz"}</span>
      </aside>

      <div className="hero-carousel__dots" role="tablist" aria-label="Slides">
        {heroImages.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-carousel__dot ${i === currentSlide ? "hero-carousel__dot--active" : ""}`}
            onClick={() => setCurrentSlide(i)}
            role="tab"
            aria-selected={i === currentSlide}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
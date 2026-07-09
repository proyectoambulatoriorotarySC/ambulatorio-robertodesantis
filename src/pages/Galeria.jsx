import { useState } from "react";
import { galleryImages } from "../data/siteContent";
import { useReveal } from "../hooks/useReveal";

const Galeria = () => {
  const [selected, setSelected] = useState(null);
  const { ref: sectionRef, isVisible } = useReveal();

  return (
    <section className={`content-section reveal ${isVisible ? "reveal--visible" : ""}`} ref={sectionRef}>
      <div className="section-heading">
        <span className="section-kicker">Galería</span>
        <h2>Fotos del Rotary</h2>
        <p>Conoce nuestras instalaciones y servicios</p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((img, i) => (
          <button
            key={i}
            type="button"
            className="stagger-card gallery-card"
            style={{ "--i": i }}
            onClick={() => setSelected(i)}
          >
            <img src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="gallery-overlay" onClick={() => setSelected(null)}>
          <div className="gallery-overlay__inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-overlay__close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <img src={galleryImages[selected].src} alt={galleryImages[selected].alt} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;

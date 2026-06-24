import { useState } from "react";
import { heroImages } from "../data/siteContent";

const Galeria = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="content-section">
      <div className="section-heading">
        <span className="section-kicker">Galería</span>
        <h2>Fotos del Rotary</h2>
        <p>Conoce nuestras instalaciones y servicios</p>
      </div>

      <div className="gallery-grid">
        {heroImages.map((img, i) => (
          <button
            key={i}
            type="button"
            className="gallery-card"
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
            <img src={heroImages[selected].src} alt={heroImages[selected].alt} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { galleryImages } from "../data/siteContent";
import { useReveal } from "../hooks/useReveal";

const Galeria = () => {
  const [selected, setSelected] = useState(null);
  const { ref: sectionRef, isVisible } = useReveal();

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  return (
    <>
      <section className={`content-section reveal ${isVisible ? "reveal--visible" : ""}`} ref={sectionRef}>
        <div className="section-heading">
          <span className="section-kicker">Galería</span>
          <h2>Fotos del Rotary</h2>
          <p>Conoce nuestras instalaciones</p>
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
      </section>

      {selected !== null &&
        createPortal(
          <div className="gallery-overlay" onClick={close}>
            <div className="gallery-overlay__inner" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="gallery-overlay__close"
                onClick={close}
                aria-label="Cerrar"
              >
                <X size={24} />
              </button>
              <img src={galleryImages[selected].src} alt={galleryImages[selected].alt} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Galeria;

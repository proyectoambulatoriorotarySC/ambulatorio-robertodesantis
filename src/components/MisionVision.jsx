import { useState } from "react";
import { institutionalContent } from "../data/siteContent";
import { X, ArrowRightCircle } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const MisionVision = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { ref: sectionRef, isVisible } = useReveal();
  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <section className={`content-section reveal ${isVisible ? "reveal--visible" : ""}`} id="nosotros" ref={sectionRef}>
      <div className="section-heading">
        <span className="section-kicker section-kicker--neutral">Nuestra Institución</span>
        <h2>Misión, Visión e Historia</h2>
        <p>Haz clic en Misión o Visión para leer el texto completo.</p>
      </div>

      <div className="mission-grid">
        <article 
          className="stagger-card mission-card mission-card--interactive mission-card--accent-blue" 
          style={{ "--i": 0 }}
          onClick={() => openModal("mision")}
        >
          <strong>Misión</strong>
          <p className="mission-card__preview">{institutionalContent.mision}</p>
          <div className="mission-card__cta">
            <span>Leer texto completo</span>
            <ArrowRightCircle size={18} />
          </div>
        </article>

        <article 
          className="stagger-card mission-card mission-card--interactive mission-card--accent-teal" 
          style={{ "--i": 1 }}
          onClick={() => openModal("vision")}
        >
          <strong>Visión</strong>
          <p className="mission-card__preview">{institutionalContent.vision}</p>
          <div className="mission-card__cta">
            <span>Leer texto completo</span>
            <ArrowRightCircle size={18} />
          </div>
        </article>

        <article
          className="stagger-card mission-card mission-card--interactive mission-card--accent-gold"
          style={{ "--i": 2 }}
          onClick={() => openModal("historia")}
        >
          <strong>Historia</strong>
          <p className="mission-card__preview">{institutionalContent.historia}</p>
          <div className="mission-card__cta">
            <span>Leer texto completo</span>
            <ArrowRightCircle size={18} />
          </div>
        </article>

      </div>

      {activeModal && (
        <div className="mission-modal-overlay" onClick={closeModal}>
          <div className="mission-modal" onClick={(e) => e.stopPropagation()}>
            <button className="mission-modal__close" onClick={closeModal} aria-label="Cerrar">
              <X size={28} />
            </button>
            <div className="mission-modal__content">
              <strong>{activeModal === "mision" ? "Nuestra Misión" : activeModal === "vision" ? "Nuestra Visión" : "Nuestra Historia"}</strong>
              <p>{activeModal === "mision" ? institutionalContent.mision : activeModal === "vision" ? institutionalContent.vision : institutionalContent.historia}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MisionVision;
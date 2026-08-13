"use client";

import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import useEmblaCarousel from "embla-carousel-react";

const SKILL_AREAS = [
  {
    id: 'fullstack',
    icon: '⬡',
    title: 'Full-Stack & Mobile',
    desc: 'Aplicaciones web modernas y multiplataforma. Interfaces de alto rendimiento con los mejores frameworks.',
    tags: ['Next.js', 'React', 'Expo', 'NestJS', 'HTMX', 'Tailwind CSS'],
    potency: 92,
    color: '#e11d48',
    details: 'Desarrollo de plataformas SaaS completas, aplicaciones móviles con Expo y sistemas e-learning. Dominio de Server-Side Rendering (SSR) y Static Site Generation (SSG) con Next.js, y creación de UIs fluidas con Tailwind CSS y HTMX para experiencias de usuario premium.',
  },
  {
    id: 'backend',
    icon: '▣',
    title: 'Arquitectura Backend',
    desc: 'APIs robustas, microservicios y bases de datos eficientes para sistemas escalables.',
    tags: ['Go (Gin)', 'Python (Django)', 'PostgreSQL', 'Redis', 'SQLite', 'Node.js'],
    potency: 88,
    color: '#3b82f6',
    details: 'Diseño avanzado de esquemas de bases de datos relacionales, optimización de consultas complejas y migraciones. Construcción de APIs REST ultrarrápidas y concurrentes utilizando Go (Gin) y sistemas completos con Python (Django). Implementación de capas de caché con Redis para máxima performance.',
  },
  {
    id: 'ai-data',
    icon: '◈',
    title: 'IA & Data Science',
    desc: 'Análisis de datos, NLP y creación de agentes autónomos potenciados por LLMs y Machine Learning.',
    tags: ['Streamlit', 'spaCy', 'Gemini API', 'AI Agents', 'Pandas'],
    potency: 85,
    color: '#8b5cf6',
    details: 'Implementación de pipelines de Procesamiento de Lenguaje Natural (NLP) usando spaCy y TF-IDF. Desarrollo de sistemas interactivos en Streamlit, y creación de agentes de Inteligencia Artificial autónomos (ej. proyecto Prometheus) integrando directamente la API de Google Gemini para razonamiento complejo.',
  },
];

export default function SkillsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const toggleSkill = (id: string | null) => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!(document as any).startViewTransition || isReducedMotion) {
      setSelectedId(id);
      return;
    }
    (document as any).startViewTransition(() => {
      flushSync(() => {
        setSelectedId(id);
      });
    });
  };

  return (
    <section
      id="skills"
      aria-label="Habilidades"
      className="section-padding section-lazy"
      style={{ background: 'var(--surface)', position: 'relative' }}
    >
      <div className="section-container">
        <div className="section-divider reveal" />
        <p
          className="reveal"
          style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: '12px',
          }}
        >
          Habilidades
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <h2
            className="reveal"
            style={{
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: 700,
              color: 'var(--foreground)',
              margin: 0,
            }}
          >
            Áreas de expertise
          </h2>
        </div>

        {/* Carrusel (Embla) */}
        <div className="embla" ref={emblaRef} style={{ overflow: "hidden", margin: "0 -20px", padding: "20px" }}>
          <div className="embla__container" style={{ display: "flex", touchAction: "pan-y", marginLeft: "-20px" }}>
          {SKILL_AREAS.map((area) => {
            const isSelected = selectedId === area.id;

            return (
              <div key={area.id} style={{ flex: "0 0 auto", minWidth: 0, paddingLeft: "20px", width: "100%", maxWidth: "340px" }}>
              <article
                onClick={() => toggleSkill(area.id)}
                className="skill-card reveal"
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                  viewTransitionName: isSelected ? "skill-card" : "none",
                  visibility: isSelected ? "hidden" : "visible",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.98)"; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
              >
                {/* Icono */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(225,29,72,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    color: 'var(--accent)',
                    marginBottom: '16px',
                    userSelect: 'none',
                    viewTransitionName: isSelected ? "skill-icon" : "none",
                  }}
                  aria-hidden="true"
                >
                  {area.icon}
                </div>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                    viewTransitionName: isSelected ? "skill-title" : "none",
                  }}
                >
                  {area.title}
                </h3>
                
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--muted-light)',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                    viewTransitionName: isSelected ? "skill-desc" : "none",
                  }}
                >
                  {area.desc}
                </p>

                {/* Potency meter */}
                <div
                  style={{ marginBottom: '14px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--muted)' }}>
                    <span>Competencia</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--surface-2)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div
                      style={{ 
                        height: '100%', 
                        borderRadius: '99px', 
                        background: `linear-gradient(90deg, ${area.color}, ${area.color}88)`,
                        width: `${area.potency}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '6px',
                  viewTransitionName: isSelected ? "skill-tags" : "none",
                }}>
                  {area.tags.map((tag) => (
                    <span key={tag} className="tech-badge" style={{ fontSize: '10px', padding: '2px 8px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {selectedId && (
        <>
          <div
            onClick={() => toggleSkill(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--overlay-bg)',
              backdropFilter: 'blur(4px)',
              zIndex: 100,
              viewTransitionName: "skill-overlay",
            }}
          />
          {SKILL_AREAS.map(area => area.id === selectedId && (
            <div
              key={`modal-${area.id}`}
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 101,
                padding: '20px',
                pointerEvents: 'none',
              }}
            >
              <article
                role="dialog"
                aria-modal="true"
                aria-label={area.title}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderTop: '2px solid var(--accent)',
                  borderRadius: '12px',
                  padding: '32px',
                  width: '100%',
                  maxWidth: '500px',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  boxShadow: 'var(--card-shadow-lg)',
                  pointerEvents: 'auto',
                  position: 'relative',
                  cursor: 'pointer',
                  viewTransitionName: "skill-card",
                }}
                onClick={() => toggleSkill(null)}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(225,29,72,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: 'var(--accent)',
                    marginBottom: '20px',
                    viewTransitionName: "skill-icon",
                  }}
                >
                  {area.icon}
                </div>

                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--foreground)',
                    marginBottom: '12px',
                    letterSpacing: '-0.02em',
                    viewTransitionName: "skill-title",
                  }}
                >
                  {area.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--muted-light)',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                    viewTransitionName: "skill-desc",
                  }}
                >
                  {area.desc}
                </p>

                <div
                  style={{
                    background: 'var(--surface-2)',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    border: '1px solid var(--border)',
                    viewTransitionName: "skill-details-box",
                  }}
                >
                  <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 600 }}>
                    Detalle de experiencia
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--foreground-2)', lineHeight: 1.7 }}>
                    {area.details}
                  </p>
                </div>

                {/* Potency meter en modal */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: 'var(--muted)' }}>
                    <span>Nivel de competencia</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--surface-2)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div
                      style={{ 
                        height: '100%', 
                        borderRadius: '99px', 
                        background: `linear-gradient(90deg, ${area.color}, ${area.color}88)`,
                        width: `${area.potency}%`,
                      }}
                    />
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '8px',
                  viewTransitionName: "skill-tags",
                }}>
                  {area.tags.map((tag) => (
                    <span key={tag} className="tech-badge" style={{ fontSize: '12px', padding: '4px 10px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

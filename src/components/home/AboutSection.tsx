"use client";

import React, { useState } from "react";
import { flushSync } from "react-dom";

const ABOUT_CHAPTERS = [
  {
    id: "perfil",
    title: "El Perfil Técnico",
    desc: "Desarrollador Full-Stack, Data Scientist y lider técnico en desarrollo de software a medida en Chascomus.",
    details:
      "Con mas de 3 años de experiencia, mi vision combina el entendimiento del hardware con el desarrollo de software escalable. Lidero proyectos de software a medida: plataformas e-learning, integraciones avanzadas, aplicaciones SaaS, diseñando arquitecturas de sistemas complejos y gestionando proyectos end-to-end. Integro la Inteligencia Artificial como herramienta potenciadora real, no como un simple parche. Trabajo con clientes en Chascomus, Buenos Aires y de forma remota en todo el pais.",
    tags: [
      "Full-Stack",
      "Data Science",
      "SaaS",
      "Arquitectura",
      "5+ años exp",
    ],
  },
  {
    id: "formacion",
    title: "Formacion y Camino",
    desc: "De Tecnico de PC a Ingeniero de Sistemas autodidacta.",
    details:
      "Mi formacion comenzó como Tecnico de Reparacion de PC, lo que me dio las bases sobre hardware y sistemas operativos. Actualmente curso la Tecnicatura en Ciencia de Datos e IA en el ISFDyT 57, a la par que estudio Ingenieria de Sistemas de manera completamente autodidacta (siguiendo el curriculo de OSSU Computer Science), abarcando estructuras de datos, algoritmos, y fundamentos matematicos.",
    tags: [
      "Tecnico de PC",
      "ISFDyT 57",
      "Ing. de Sistemas",
      "OSSU",
      "Autodidacta",
    ],
  },
];

export default function AboutSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleChapter = (id: string | null) => {
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
      id="about"
      aria-label="Sobre mí"
      className="section-padding section-lazy"
      style={{ position: "relative" }}
    >
      <div className="section-container">
        <div className="section-divider reveal" />
        <p
          className="reveal"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          Biografía
        </p>
        <h2
          className="reveal"
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: "48px",
          }}
        >
          Sobre mí
        </h2>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "20px",
          }}
        >
          {ABOUT_CHAPTERS.map((chapter) => {
            const isSelected = selectedId === chapter.id;
            
            return (
              <article
                key={chapter.id}
                onClick={() => toggleChapter(chapter.id)}
                className="skill-card reveal"
                style={{
                  cursor: "pointer",
                  background: "var(--surface)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  viewTransitionName: isSelected ? "about-card" : "none",
                  visibility: isSelected ? "hidden" : "visible",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.98)"; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    marginBottom: "10px",
                    letterSpacing: "-0.01em",
                    viewTransitionName: isSelected ? "about-title" : "none",
                  }}
                >
                  {chapter.title}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--muted-light)",
                    lineHeight: 1.7,
                    marginBottom: "16px",
                    viewTransitionName: isSelected ? "about-desc" : "none",
                  }}
                >
                  {chapter.desc}
                </p>

                {/* Tags */}
                <div
                  style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "6px",
                    viewTransitionName: isSelected ? "about-tags" : "none",
                  }}
                >
                  {chapter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tech-badge"
                      style={{ fontSize: "10px", padding: "2px 8px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* External links (solo en perfil) */}
                {chapter.id === "perfil" && (
                  <div
                    style={{ display: "flex", gap: "12px", marginTop: "20px" }}
                  >
                    <a
                      href="https://github.com/GalvanAlexis"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "12px",
                        color: "var(--muted)",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--muted)";
                      }}
                    >
                      GitHub &rarr;
                    </a>
                    <a
                      href="https://www.linkedin.com/in/alexis-galvan"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "12px",
                        color: "var(--muted)",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--muted)";
                      }}
                    >
                      LinkedIn &rarr;
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal */}
      {selectedId && (
        <>
          <div
            onClick={() => toggleChapter(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--overlay-bg)",
              backdropFilter: "blur(4px)",
              zIndex: 100,
              viewTransitionName: "about-overlay",
            }}
          />
          {ABOUT_CHAPTERS.map(
            (chapter) =>
              chapter.id === selectedId && (
                <div
                  key={`modal-about-${chapter.id}`}
                  style={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 101,
                    padding: "20px",
                    pointerEvents: "none",
                  }}
                >
                  <article
                    role="dialog"
                    aria-modal="true"
                    aria-label={chapter.title}
                    onClick={() => toggleChapter(null)}
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      borderTop: "2px solid var(--accent)",
                      borderRadius: "12px",
                      padding: "32px",
                      width: "100%",
                      maxWidth: "500px",
                      maxHeight: "85vh",
                      overflowY: "auto",
                      boxShadow: "var(--card-shadow-lg)",
                      pointerEvents: "auto",
                      position: "relative",
                      cursor: "pointer",
                      viewTransitionName: "about-card",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        marginBottom: "12px",
                        letterSpacing: "-0.02em",
                        viewTransitionName: "about-title",
                      }}
                    >
                      {chapter.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--muted-light)",
                        lineHeight: 1.6,
                        marginBottom: "24px",
                        fontWeight: 500,
                        viewTransitionName: "about-desc",
                      }}
                    >
                      {chapter.desc}
                    </p>

                    <div
                      style={{
                        background: "var(--surface)",
                        padding: "20px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                        border: "1px solid var(--border-subtle)",
                        viewTransitionName: "about-details-box",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--foreground-2)",
                          lineHeight: 1.8,
                          margin: 0,
                        }}
                      >
                        {chapter.details}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        viewTransitionName: "about-tags",
                      }}
                    >
                      {chapter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="tech-badge"
                          style={{ fontSize: "12px", padding: "4px 10px" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              ),
          )}
        </>
      )}
    </section>
  );
}

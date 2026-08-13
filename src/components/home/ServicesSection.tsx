"use client";

/**
 * ServicesSection — ISS-053
 * Sección interactiva de servicios orientada a clientes y pymes,
 * con expansión a través de layoutId de framer-motion.
 */
import React, { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";

const SERVICES = [
  {
    id: "hardware",
    title: "Reparación de PC",
    subtitle: "Nivel Componente y Software",
    desc: "Diagnostico preciso, mantenimiento preventivo/correctivo y optimizacion profunda de PCs en Chascomus.",
    details:
      "Mi enfoque tecnico de reparacion esta fuertemente inclinado a la resolucion por software y a la optimizacion del sistema operativo. A nivel de hardware, la reparacion se ejecuta mediante el recambio directo del componente dañado. El servicio esta destinado exclusivamente a PCs de Escritorio en Chascomus (no notebooks ni dispositivos moviles), asegurando diagnosticos certeros y que el equipo vuelva a rendir al maximo.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    tags: [
      "PC de Escritorio",
      "Optimización SO",
      "Diagnóstico Avanzado",
      "Recambio de Componentes",
    ],
    localOnly: true,
  },
  {
    id: "software",
    title: "Automatizaciones",
    subtitle: "Soluciones Digitales",
    desc: "Sistemas a medida para PyMEs y emprendedores que ahorran horas de trabajo a la semana.",
    details:
      "Analisis de cómo tu negocio pierde tiempo en tareas manuales, asi desarrollar software a medida para resolverlo. Ya sea creando bots de respuesta automática, scripts para carga masiva de datos, o conectando todos tus sistemas actuales a través de APIs. El objetivo es claro: automatizar lo repetitivo para que tu equipo se enfoque en hacer crecer el negocio.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    tags: [
      "Bots",
      "Scripts",
      "Node.js",
      "Integración de APIs",
      "Sistemas a Medida",
    ],
  },
  {
    id: "data",
    title: "Ciencia de Datos",
    subtitle: "Optimización con IA",
    desc: "Análisis profundo de datos y tableros predictivos para tomar decisiones gerenciales informadas.",
    details:
      "Diseño de tableros de control interactivos (Dashboards) analizando a fondo la base de datos de tus clientes u operaciones. Integrando modelos de lenguaje potentes (LLMs API) y algoritmos predictivos para asistir en la toma de decisiones, escalar tu operatividad de manera inteligente y descubrir patrones que mejoren directamente la rentabilidad.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    tags: [
      "Dashboards",
      "Machine Learning",
      "Gemini API",
      "Análisis Predictivo",
      "Pandas",
    ],
  },
];

export default function ServicesSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });

  useEffect(() => {
    if (selectedId) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [selectedId]);

  const toggleService = (id: string | null) => {
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
      id="servicios"
      aria-label="Servicios"
      className="section-padding section-lazy"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--surface)",
      }}
    >
      {/* Video Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          src="/video/Mind-explosion.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
          }}
        />
        {/* Overlay gradient para mezclar suavemente */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, var(--background) 0%, transparent 15%, transparent 85%, var(--background) 100%), var(--services-video-overlay)",
          }}
        />
      </div>

      <div
        className="section-container"
        style={{ position: "relative", zIndex: 1 }}
      >
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
          Servicios IT
        </p>
        <h2
          className="reveal"
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 700,
            color: "var(--foreground)",
            margin: "0 0 48px 0",
          }}
        >
          ¿Cómo te puedo ayudar?
        </h2>

        {/* Carrusel Infinito de Servicios */}
        <div
          ref={emblaRef}
          style={{
            overflow: "hidden",
            width: "100%",
            cursor: "grab",
            padding: "20px 0",
            margin: "-20px 0",
          }}
          onMouseDown={(e) => { e.currentTarget.style.cursor = "grabbing"; }}
          onMouseUp={(e) => { e.currentTarget.style.cursor = "grab"; }}
          onMouseLeave={(e) => { e.currentTarget.style.cursor = "grab"; }}
        >
          <div
            style={{
              display: "flex",
              touchAction: "pan-y pinch-zoom",
              backfaceVisibility: "hidden",
            }}
          >
            {SERVICES.map((srv) => {
              const isSelected = selectedId === srv.id;
              // Asignamos el nombre de transicion al seleccionado justo antes de mutar
              return (
                <article
                  key={srv.id}
                  onClick={() => toggleService(srv.id)}
                  className="reveal"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "32px 28px",
                    flex: "0 0 clamp(280px, 85%, 380px)",
                    marginRight: "24px",
                    minWidth: "0",
                    cursor: "pointer",
                  transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.2s",
                  viewTransitionName: isSelected ? "service-card" : "none",
                  // Si el modal esta abierto para ESTE servicio, lo ocultamos visualmente en el grid (ya que está en el modal)
                  visibility: isSelected ? "hidden" : "visible", 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(225,29,72,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.98)"; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    viewTransitionName: isSelected ? "service-icon" : "none",
                  }}
                >
                  {srv.icon}
                </div>

                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    margin: "0 0 4px 0",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    width: "fit-content",
                    viewTransitionName: isSelected ? "service-title" : "none",
                  }}
                >
                  {srv.title}
                  {srv.localOnly && (
                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        border: "1px solid var(--accent)",
                        borderRadius: "4px",
                        padding: "2px 8px",
                        fontWeight: 600,
                      }}
                    >
                      Exclusivo Chascomus
                    </span>
                  )}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--accent)",
                    fontWeight: 500,
                    margin: "0 0 16px 0",
                    width: "fit-content",
                    viewTransitionName: isSelected ? "service-subtitle" : "none",
                  }}
                >
                  {srv.subtitle}
                </p>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "var(--foreground-2)",
                    margin: 0,
                    viewTransitionName: isSelected ? "service-desc" : "none",
                  }}
                >
                  {srv.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>

      {/* Expanded Modal */}
      {selectedId && (
        <>
          <div
            onClick={() => toggleService(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--overlay-bg)",
              backdropFilter: "blur(4px)",
              zIndex: 100,
              viewTransitionName: "service-overlay",
            }}
          />
          {SERVICES.map(
            (srv) =>
              srv.id === selectedId && (
                <div
                  key={`modal-srv-${srv.id}`}
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
                    aria-label={srv.title}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderTop: "2px solid var(--accent)",
                      borderRadius: "12px",
                      padding: "32px",
                      width: "100%",
                      maxWidth: "540px",
                      boxShadow: "var(--card-shadow-lg)",
                      pointerEvents: "auto",
                      position: "relative",
                      viewTransitionName: "service-card",
                    }}
                  >
                    <button
                      onClick={() => toggleService(null)}
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: "transparent",
                        border: "none",
                        color: "var(--muted)",
                        cursor: "pointer",
                        padding: "8px",
                        fontSize: "14px",
                      }}
                    >
                      ✕
                    </button>

                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "12px",
                        background: "var(--accent-dim)",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                        viewTransitionName: "service-icon",
                      }}
                    >
                      {srv.icon}
                    </div>

                    <h3
                      style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        margin: "0 0 6px 0",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                        width: "fit-content",
                        viewTransitionName: "service-title",
                      }}
                    >
                      {srv.title}
                      {srv.localOnly && (
                        <span
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            border: "1px solid var(--accent)",
                            borderRadius: "4px",
                            padding: "3px 10px",
                            fontWeight: 600,
                          }}
                        >
                          Exclusivo Chascomus
                        </span>
                      )}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--accent)",
                        fontWeight: 600,
                        margin: "0 0 20px 0",
                        width: "fit-content",
                        viewTransitionName: "service-subtitle",
                      }}
                    >
                      {srv.subtitle}
                    </p>

                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.6,
                        color: "var(--foreground-2)",
                        margin: "0 0 24px 0",
                        fontWeight: 500,
                        viewTransitionName: "service-desc",
                      }}
                    >
                      {srv.desc}
                    </p>

                    <div
                      style={{
                        background: "var(--surface-2)",
                        padding: "20px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                        border: "1px solid var(--border-subtle)",
                        viewTransitionName: "service-details-box",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "15px",
                          color: "var(--foreground-2)",
                          lineHeight: 1.8,
                          margin: 0,
                        }}
                      >
                        {srv.details}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        viewTransitionName: "service-tags",
                      }}
                    >
                      {srv.tags.map((tag) => (
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

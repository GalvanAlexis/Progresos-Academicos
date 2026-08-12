'use client';

import type { Curso } from '../hooks/useAdmin';
import ProgressBar from './ProgressBar';

function Llamitas({ n }: { n: number }) {
  return (
    <span className="sabor-llamitas" aria-label={`Dificultad ${n} de 3`}>
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className={i < n ? 'sabor-llama-on' : 'sabor-llama-off'}>
          {i < n ? '🔥' : '🤍'}
        </span>
      ))}
      <style>{`
        .sabor-llamitas { display: inline-flex; gap: 1px; }
        .sabor-llama-on { font-size: 0.9rem; }
        .sabor-llama-off { font-size: 0.9rem; opacity: 0.3; }
      `}</style>
    </span>
  );
}

export default function CoursesGrid({
  cursos,
  progreso,
  onSelectCurso,
}: {
  cursos: Curso[];
  progreso: Record<string, { leccionesCompletadas: number; quizCompletado: boolean; certificadoObtenido: boolean }>;
  onSelectCurso: (id: string) => void;
}) {
  return (
    <section className="sabor-section" id="cursos">
      <div className="sabor-section-inner">
        <h2 className="sabor-section-title">Nuestros Cursos</h2>
        <div className="sabor-grid">
          {cursos.map((curso) => {
            const p = progreso[curso.id];
            const completadas = p?.leccionesCompletadas ?? 0;
            return (
              <button
                key={curso.id}
                className="sabor-card"
                onClick={() => onSelectCurso(curso.id)}
              >
                <div className="sabor-card-img">
                  <img src={curso.imagen} alt={curso.titulo} loading="lazy" />
                  {p?.certificadoObtenido && (
                    <span className="sabor-card-badge">✅ Completado</span>
                  )}
                </div>
                <div className="sabor-card-body">
                  <h3 className="sabor-card-title">{curso.titulo}</h3>
                  <Llamitas n={curso.dificultad} />
                  <p className="sabor-card-duracion">{curso.duracion} lecciones</p>
                  <ProgressBar
                    actual={completadas}
                    total={curso.duracion}
                    label={`${completadas}/${curso.duracion}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`
        .sabor-section {
          padding: 60px 16px;
          background: #faf8f5;
        }
        .sabor-section-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .sabor-section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d2a24;
          margin: 0 0 28px;
        }
        .sabor-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .sabor-card {
          background: #fff;
          border: 1px solid #e8e3de;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: left;
          display: flex;
          flex-direction: column;
          padding: 0;
          font-family: inherit;
        }
        .sabor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .sabor-card-img {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #e8e3de;
        }
        .sabor-card-img img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .sabor-card-badge {
          position: absolute;
          top: 8px; right: 8px;
          background: #4CAF50;
          color: #fff;
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .sabor-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .sabor-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #2d2a24;
          margin: 0;
        }
        .sabor-card-duracion {
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0;
        }
        @media (max-width: 900px) {
          .sabor-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .sabor-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

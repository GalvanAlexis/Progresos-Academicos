'use client';

import type { Curso, CursoProgreso } from '../hooks/useAdmin';
import ProgressBar from './ProgressBar';

function Llamitas({ n }: { n: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} style={{ fontSize: '0.9rem', opacity: i < n ? 1 : 0.3 }}>
          {i < n ? '🔥' : '🤍'}
        </span>
      ))}
    </span>
  );
}

export default function CourseDetail({
  curso,
  progreso,
  onOpenLeccion,
  onTomarQuiz,
  onVolver,
  onVerCertificado,
}: {
  curso: Curso;
  progreso: CursoProgreso;
  onOpenLeccion: (leccionId: string) => void;
  onTomarQuiz: () => void;
  onVolver: () => void;
  onVerCertificado: () => void;
}) {
  const todasCompletadas = curso.lecciones.every((l) => l.completada);

  return (
    <section className="sabor-detail">
      <div className="sabor-detail-inner">
        <button className="sabor-back-btn" onClick={onVolver}>
          ← Volver a cursos
        </button>

        <div className="sabor-detail-banner">
          <img src={curso.imagen} alt={curso.titulo} />
          <div className="sabor-detail-overlay">
            <h2 className="sabor-detail-title">{curso.titulo}</h2>
            <div className="sabor-detail-meta">
              <Llamitas n={curso.dificultad} />
              <span>{curso.duracion} lecciones</span>
            </div>
          </div>
        </div>

        <p className="sabor-detail-desc">{curso.descripcion}</p>

        <ProgressBar
          actual={progreso.leccionesCompletadas}
          total={curso.duracion}
          label={`${progreso.leccionesCompletadas}/${curso.duracion} lecciones`}
        />

        <div className="sabor-detail-lecciones">
          <h3>Lecciones</h3>
          {curso.lecciones.map((lec) => (
            <button
              key={lec.id}
              className={`sabor-lec-item ${lec.completada ? 'sabor-lec-completada' : ''}`}
              onClick={() => onOpenLeccion(lec.id)}
            >
              <span className="sabor-lec-icon">
                {lec.completada ? '✅' : '📖'}
              </span>
              <span className="sabor-lec-nombre">{lec.titulo}</span>
              <span className="sabor-lec-arrow">→</span>
            </button>
          ))}
        </div>

        {todasCompletadas && !progreso.quizCompletado && (
          <div className="sabor-detail-quiz-cta">
            <button className="sabor-btn sabor-btn-primary sabor-btn-lg" onClick={onTomarQuiz}>
              Tomar Quiz
            </button>
          </div>
        )}

        {progreso.quizCompletado && (
          <div className="sabor-detail-completed">
            <p>Quiz completado! 🎉</p>
            {!progreso.certificadoObtenido && (
              <button className="sabor-btn sabor-btn-primary" onClick={onVerCertificado}>
                Ver certificado
              </button>
            )}
          </div>
        )}

        {progreso.certificadoObtenido && (
          <div className="sabor-detail-completed">
            <p>Certificado obtenido! 🏆</p>
            <button className="sabor-btn sabor-btn-secondary" onClick={onVerCertificado}>
              Ver certificado
            </button>
          </div>
        )}
      </div>

      <style>{`
        .sabor-detail {
          padding: 24px 16px 60px;
          background: #faf8f5;
        }
        .sabor-detail-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .sabor-back-btn {
          background: none; border: none;
          color: #E86A33; font-size: 0.95rem;
          cursor: pointer; padding: 0 0 20px;
          font-weight: 600;
        }
        .sabor-back-btn:hover { text-decoration: underline; }
        .sabor-detail-banner {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .sabor-detail-banner img {
          width: 100%; aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
        }
        .sabor-detail-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: #fff;
        }
        .sabor-detail-title {
          font-size: 1.5rem; font-weight: 700;
          margin: 0 0 6px;
        }
        .sabor-detail-meta {
          display: flex; gap: 12px; align-items: center;
          font-size: 0.9rem;
        }
        .sabor-detail-desc {
          font-size: 1rem; color: #6b7280;
          margin: 0 0 16px; line-height: 1.5;
        }
        .sabor-detail-lecciones {
          margin-top: 24px;
        }
        .sabor-detail-lecciones h3 {
          font-size: 1.1rem; font-weight: 700;
          color: #2d2a24; margin: 0 0 12px;
        }
        .sabor-lec-item {
          display: flex; align-items: center; gap: 12px;
          width: 100%; padding: 14px 16px;
          background: #fff; border: 1px solid #e8e3de;
          border-radius: 12px; margin-bottom: 8px;
          cursor: pointer; transition: all 0.2s;
          font-family: inherit; font-size: inherit;
          text-align: left;
        }
        .sabor-lec-item:hover {
          border-color: #E86A33; background: #fff4e5;
        }
        .sabor-lec-completada {
          opacity: 0.7;
        }
        .sabor-lec-completada .sabor-lec-nombre {
          text-decoration: line-through;
        }
        .sabor-lec-icon { font-size: 1.1rem; }
        .sabor-lec-nombre { flex: 1; color: #2d2a24; font-weight: 500; }
        .sabor-lec-arrow { color: #6b7280; font-size: 0.9rem; }
        .sabor-detail-quiz-cta {
          text-align: center; margin-top: 28px;
        }
        .sabor-detail-completed {
          text-align: center; margin-top: 20px;
          padding: 20px; background: #e8f5e9;
          border: 1px solid #a5d6a7; border-radius: 16px;
        }
        .sabor-detail-completed p {
          font-size: 1.1rem; font-weight: 600;
          color: #2e7d32; margin: 0 0 12px;
        }
        .sabor-btn-lg {
          padding: 14px 36px; font-size: 1.05rem;
        }
      `}</style>
    </section>
  );
}

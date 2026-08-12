'use client';

import { useState } from 'react';
import type { Leccion } from '../hooks/useAdmin';
import GatoChef from './GatoChef';

export default function LessonView({
  leccion,
  onCompletar,
  onVolver,
}: {
  leccion: Leccion;
  onCompletar: () => void;
  onVolver: () => void;
}) {
  const [checklist, setChecklist] = useState<string[]>([]);

  function toggleIngrediente(item: string) {
    setChecklist((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  return (
    <section className="sabor-lesson">
      <div className="sabor-lesson-inner">
        <button className="sabor-back-btn" onClick={onVolver}>
          ← Volver al curso
        </button>

        <div className="sabor-lesson-header">
          <img src={leccion.imagen} alt={leccion.titulo} className="sabor-lesson-img" />
          <h2 className="sabor-lesson-title">{leccion.titulo}</h2>
        </div>

        {/* Ingredientes */}
        <div className="sabor-lesson-block">
          <h3 className="sabor-block-title">🧂 Ingredientes</h3>
          <div className="sabor-checklist">
            {leccion.ingredientes.map((item) => (
              <label key={item} className="sabor-check-item">
                <input
                  type="checkbox"
                  checked={checklist.includes(item)}
                  onChange={() => toggleIngrediente(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Utensilios */}
        {leccion.utensilios.length > 0 && (
          <div className="sabor-lesson-block">
            <h3 className="sabor-block-title">🔪 Utensilios</h3>
            <div className="sabor-utensilios">
              {leccion.utensilios.map((u) => (
                <span key={u} className="sabor-utensilio-tag">{u}</span>
              ))}
            </div>
          </div>
        )}

        {/* Pasos */}
        <div className="sabor-lesson-block">
          <h3 className="sabor-block-title">📋 Pasos</h3>
          <ol className="sabor-pasos">
            {leccion.pasos.map((paso) => (
              <li key={paso.numero} className="sabor-paso">
                <p className="sabor-paso-texto">{paso.texto}</p>
                {paso.imagen && (
                  <img src={paso.imagen} alt="" className="sabor-paso-img" loading="lazy" />
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Tips del gato */}
        {leccion.tips.length > 0 && (
          <div className="sabor-tips-block">
            <div className="sabor-tips-header">
              <GatoChef size={36} />
              <span className="sabor-tips-label">El Gato dice:</span>
            </div>
            <ul className="sabor-tips-list">
              {leccion.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Boton completar */}
        <div className="sabor-lesson-actions">
          <button className="sabor-btn sabor-btn-primary sabor-btn-lg" onClick={onCompletar}>
            Completar Leccion
          </button>
        </div>
      </div>

      <style>{`
        .sabor-lesson {
          padding: 24px 16px 60px;
          background: #faf8f5;
        }
        .sabor-lesson-inner {
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
        .sabor-lesson-header {
          margin-bottom: 28px;
        }
        .sabor-lesson-img {
          width: 100%; aspect-ratio: 16/9;
          object-fit: cover; border-radius: 16px;
          margin-bottom: 16px;
        }
        .sabor-lesson-title {
          font-size: 1.5rem; font-weight: 700;
          color: #2d2a24; margin: 0;
        }
        .sabor-lesson-block {
          background: #fff;
          border: 1px solid #e8e3de;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
        }
        .sabor-block-title {
          font-size: 1.05rem; font-weight: 700;
          color: #2d2a24; margin: 0 0 12px;
        }
        .sabor-checklist {
          display: flex; flex-direction: column; gap: 8px;
        }
        .sabor-check-item {
          display: flex; align-items: center; gap: 10px;
          cursor: pointer; font-size: 0.95rem; color: #2d2a24;
        }
        .sabor-check-item input {
          width: 18px; height: 18px;
          accent-color: #4CAF50;
        }
        .sabor-utensilios {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .sabor-utensilio-tag {
          background: #faf8f5; border: 1px solid #e8e3de;
          padding: 6px 14px; border-radius: 99px;
          font-size: 0.85rem; color: #2d2a24;
        }
        .sabor-pasos {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 16px;
        }
        .sabor-paso {
          counter-increment: paso-counter;
          padding: 16px; background: #faf8f5;
          border-radius: 12px;
        }
        .sabor-paso::before {
          content: counter(paso-counter);
          display: inline-block; width: 28px; height: 28px;
          line-height: 28px; text-align: center;
          background: #E86A33; color: #fff;
          border-radius: 50%; font-weight: 700; font-size: 0.85rem;
          margin-right: 10px; vertical-align: middle;
        }
        .sabor-paso-texto {
          display: inline; font-size: 0.95rem; color: #2d2a24; margin: 0;
        }
        .sabor-paso-img {
          width: 100%; border-radius: 12px; margin-top: 10px;
        }
        .sabor-tips-block {
          background: #fff4e5;
          border: 1px solid #f5d6b8;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
        }
        .sabor-tips-header {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 12px;
        }
        .sabor-tips-label {
          font-weight: 700; color: #E86A33; font-size: 1rem;
        }
        .sabor-tips-list {
          margin: 0; padding-left: 20px;
          color: #2d2a24; font-size: 0.9rem;
          display: flex; flex-direction: column; gap: 6px;
        }
        .sabor-lesson-actions {
          text-align: center; margin-top: 28px;
        }
        .sabor-btn-lg {
          padding: 14px 36px; font-size: 1.05rem;
        }
        ol { counter-reset: paso-counter; }
      `}</style>
    </section>
  );
}

'use client';

import { useState } from 'react';
import type { AdminState, Curso } from '../hooks/useAdmin';

type Tab = 'cursos' | 'lecciones' | 'quizzes' | 'badges';

export default function AdminDashboard({
  state,
  onUpdate,
  onReset,
  onClose,
}: {
  state: AdminState;
  onUpdate: (partial: Partial<AdminState>) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>('cursos');
  const [selectedCurso, setSelectedCurso] = useState<string>(state.cursos[0]?.id || '');

  function actualizarCurso(id: string, campo: string, valor: string | number) {
    const cursos = state.cursos.map((c) =>
      c.id === id ? { ...c, [campo]: valor } : c
    );
    onUpdate({ cursos });
  }

  function actualizarLeccion(cursoId: string, leccionId: string, campo: string, valor: string) {
    let parsed: string | string[] = valor;
    if (campo === 'ingredientes') {
      try { parsed = JSON.parse(valor); } catch { parsed = valor.split('\n').filter(Boolean); }
    }
    const cursos = state.cursos.map((c) =>
      c.id === cursoId
        ? {
            ...c,
            lecciones: c.lecciones.map((l) =>
              l.id === leccionId ? { ...l, [campo]: parsed } : l
            ),
          }
        : c
    );
    onUpdate({ cursos });
  }

  function actualizarPregunta(cursoId: string, preguntaIdx: number, campo: string, valor: string | number) {
    let parsed: string | number | string[] = valor;
    if (campo === 'opciones') {
      try { parsed = JSON.parse(valor as string); } catch { parsed = (valor as string).split('\n').filter(Boolean); }
    }
    const cursos = state.cursos.map((c) =>
      c.id === cursoId
        ? {
            ...c,
            quiz: {
              ...c.quiz,
              preguntas: c.quiz.preguntas.map((p, i) =>
                i === preguntaIdx ? { ...p, [campo]: parsed } : p
              ),
            },
          }
        : c
    );
    onUpdate({ cursos });
  }

  function actualizarBadge(id: string, campo: string, valor: string) {
    const badges = state.badges.map((b) =>
      b.id === id ? { ...b, [campo]: valor } : b
    );
    onUpdate({ badges });
  }

  function handleReset() {
    if (confirm('Restablecer todos los datos a los valores originales?')) {
      onReset();
    }
  }

  const cursoSel = state.cursos.find((c) => c.id === selectedCurso);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'cursos', label: 'Cursos' },
    { id: 'lecciones', label: 'Lecciones' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'badges', label: 'Badges' },
  ];

  return (
    <div className="sabor-modal-overlay" onClick={onClose}>
      <div className="sabor-admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sabor-admin-header">
          <h2>Panel de Administracion</h2>
          <div className="sabor-admin-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`sabor-admin-tab ${tab === t.id ? 'sabor-admin-tab-active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button className="sabor-admin-close" onClick={onClose}>×</button>
        </div>

        <div className="sabor-admin-body">
          {tab === 'cursos' && (
            <div className="sabor-admin-panel">
              {state.cursos.map((c) => (
                <div key={c.id} className="sabor-admin-field-group">
                  <h4>{c.titulo}</h4>
                  <label>Titulo</label>
                  <input className="sabor-input" value={c.titulo} onChange={(e) => actualizarCurso(c.id, 'titulo', e.target.value)} />
                  <label>Descripcion</label>
                  <textarea className="sabor-input sabor-textarea" value={c.descripcion} onChange={(e) => actualizarCurso(c.id, 'descripcion', e.target.value)} rows={2} />
                  <label>Dificultad (1-3)</label>
                  <input className="sabor-input" type="number" min={1} max={3} value={c.dificultad} onChange={(e) => actualizarCurso(c.id, 'dificultad', Math.min(3, Math.max(1, parseInt(e.target.value) || 1)))} />
                  <label>URL de imagen</label>
                  <input className="sabor-input" value={c.imagen} onChange={(e) => actualizarCurso(c.id, 'imagen', e.target.value)} />
                </div>
              ))}
            </div>
          )}

          {tab === 'lecciones' && (
            <div className="sabor-admin-panel">
              <label>Seleccionar curso</label>
              <select className="sabor-input" value={selectedCurso} onChange={(e) => setSelectedCurso(e.target.value)}>
                {state.cursos.map((c) => (
                  <option key={c.id} value={c.id}>{c.titulo}</option>
                ))}
              </select>
              {cursoSel?.lecciones.map((lec) => (
                <div key={lec.id} className="sabor-admin-field-group">
                  <h4>{lec.titulo}</h4>
                  <label>Titulo</label>
                  <input className="sabor-input" value={lec.titulo} onChange={(e) => actualizarLeccion(cursoSel.id, lec.id, 'titulo', e.target.value)} />
                  <label>Ingredientes (uno por linea)</label>
                  <textarea className="sabor-input sabor-textarea" value={lec.ingredientes.join('\n')} onChange={(e) => actualizarLeccion(cursoSel.id, lec.id, 'ingredientes', JSON.stringify(e.target.value.split('\n').filter(Boolean)))} rows={3} />
                  <label>URL de imagen</label>
                  <input className="sabor-input" value={lec.imagen} onChange={(e) => actualizarLeccion(cursoSel.id, lec.id, 'imagen', e.target.value)} />
                </div>
              ))}
            </div>
          )}

          {tab === 'quizzes' && (
            <div className="sabor-admin-panel">
              <label>Seleccionar curso</label>
              <select className="sabor-input" value={selectedCurso} onChange={(e) => setSelectedCurso(e.target.value)}>
                {state.cursos.map((c) => (
                  <option key={c.id} value={c.id}>{c.titulo}</option>
                ))}
              </select>
              {cursoSel?.quiz.preguntas.map((p, i) => (
                <div key={i} className="sabor-admin-field-group">
                  <h4>Pregunta {i + 1}</h4>
                  <label>Texto</label>
                  <input className="sabor-input" value={p.texto} onChange={(e) => actualizarPregunta(cursoSel.id, i, 'texto', e.target.value)} />
                  <label>Opciones (una por linea)</label>
                  <textarea className="sabor-input sabor-textarea" value={p.opciones.join('\n')} onChange={(e) => actualizarPregunta(cursoSel.id, i, 'opciones', JSON.stringify(e.target.value.split('\n').filter(Boolean)))} rows={4} />
                  <label>Respuesta correcta (indice 0-3)</label>
                  <input className="sabor-input" type="number" min={0} max={3} value={p.correcta} onChange={(e) => actualizarPregunta(cursoSel.id, i, 'correcta', parseInt(e.target.value) || 0)} />
                  <label>Explicacion</label>
                  <input className="sabor-input" value={p.explicacion} onChange={(e) => actualizarPregunta(cursoSel.id, i, 'explicacion', e.target.value)} />
                </div>
              ))}
            </div>
          )}

          {tab === 'badges' && (
            <div className="sabor-admin-panel">
              {state.badges.map((b) => (
                <div key={b.id} className="sabor-admin-field-group">
                  <h4>{b.nombre}</h4>
                  <label>Nombre</label>
                  <input className="sabor-input" value={b.nombre} onChange={(e) => actualizarBadge(b.id, 'nombre', e.target.value)} />
                  <label>Icono (emoji)</label>
                  <input className="sabor-input" value={b.icono} onChange={(e) => actualizarBadge(b.id, 'icono', e.target.value)} />
                  <label>Descripcion</label>
                  <input className="sabor-input" value={b.descripcion} onChange={(e) => actualizarBadge(b.id, 'descripcion', e.target.value)} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sabor-admin-footer">
          <button className="sabor-btn sabor-btn-secondary" onClick={handleReset}>
            Restablecer datos
          </button>
          <button className="sabor-btn sabor-btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>

      <style>{`
        .sabor-admin-modal {
          background: #fff; border-radius: 16px;
          width: 100%; max-width: 680px; max-height: 85vh;
          display: flex; flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .sabor-admin-header {
          padding: 20px 24px 0;
          border-bottom: 1px solid #e8e3de;
          position: relative;
        }
        .sabor-admin-header h2 {
          margin: 0 0 12px; font-size: 1.2rem; color: #2d2a24;
        }
        .sabor-admin-close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; font-size: 1.5rem;
          cursor: pointer; color: #6b7280;
        }
        .sabor-admin-tabs {
          display: flex; gap: 4px;
        }
        .sabor-admin-tab {
          padding: 8px 16px; border: none; background: none;
          font-size: 0.9rem; color: #6b7280; cursor: pointer;
          border-bottom: 2px solid transparent;
          font-weight: 500;
        }
        .sabor-admin-tab-active {
          color: #E86A33; border-bottom-color: #E86A33;
        }
        .sabor-admin-body {
          flex: 1; overflow-y: auto; padding: 20px 24px;
        }
        .sabor-admin-panel {
          display: flex; flex-direction: column; gap: 8px;
        }
        .sabor-admin-field-group {
          background: #faf8f5; border: 1px solid #e8e3de;
          border-radius: 12px; padding: 16px; margin-bottom: 12px;
        }
        .sabor-admin-field-group h4 {
          margin: 0 0 10px; font-size: 0.95rem; color: #E86A33;
        }
        .sabor-admin-field-group label {
          display: block; font-size: 0.8rem; color: #6b7280;
          margin-bottom: 4px; margin-top: 8px;
        }
        .sabor-admin-field-group label:first-of-type { margin-top: 0; }
        .sabor-textarea {
          resize: vertical; min-height: 60px;
          font-family: inherit;
        }
        .sabor-admin-footer {
          padding: 16px 24px;
          border-top: 1px solid #e8e3de;
          display: flex; justify-content: space-between;
        }
        select.sabor-input {
          appearance: auto;
        }
      `}</style>
    </div>
  );
}

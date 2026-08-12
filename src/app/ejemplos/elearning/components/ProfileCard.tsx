'use client';

import { useState } from 'react';
import type { Badge } from '../hooks/useAdmin';
import ProgressBar from './ProgressBar';

const AVATARES = [
  { id: 'cat', emoji: '🐱', label: 'Gato' },
  { id: 'dog', emoji: '🐶', label: 'Perro' },
  { id: 'rabbit', emoji: '🐰', label: 'Conejo' },
  { id: 'bear', emoji: '🐻', label: 'Oso' },
  { id: 'fox', emoji: '🦊', label: 'Zorro' },
  { id: 'owl', emoji: '🦉', label: 'Buho' },
];

export default function ProfileCard({
  nombre,
  avatar,
  nivel,
  cursosCompletados,
  badges,
  onActualizar,
  onCerrar,
}: {
  nombre: string;
  avatar: string;
  nivel: number;
  cursosCompletados: number;
  badges: Badge[];
  onActualizar: (nombre: string, avatar: string) => void;
  onCerrar: () => void;
}) {
  const [editNombre, setEditNombre] = useState(nombre);
  const [editAvatar, setEditAvatar] = useState(avatar);

  function guardar() {
    onActualizar(editNombre.trim() || 'Chef', editAvatar);
    onCerrar();
  }

  const obtenidos = badges.filter((b) => b.obtenido);

  return (
    <div className="sabor-modal-overlay" onClick={onCerrar}>
      <div className="sabor-modal sabor-profile-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="sabor-modal-title">Mi Perfil</h2>

        <div className="sabor-profile-avatar-section">
          <div className="sabor-profile-avatar-grid">
            {AVATARES.map((a) => (
              <button
                key={a.id}
                className={`sabor-avatar-option ${editAvatar === a.id ? 'sabor-avatar-active' : ''}`}
                onClick={() => setEditAvatar(a.id)}
                title={a.label}
              >
                <span style={{ fontSize: '1.5rem' }}>{a.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sabor-profile-field">
          <label className="sabor-profile-label">Nombre</label>
          <input
            className="sabor-input"
            value={editNombre}
            onChange={(e) => setEditNombre(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div className="sabor-profile-stats">
          <div className="sabor-stat">
            <span className="sabor-stat-value">{nivel}</span>
            <span className="sabor-stat-label">Nivel</span>
          </div>
          <div className="sabor-stat">
            <span className="sabor-stat-value">{cursosCompletados}</span>
            <span className="sabor-stat-label">Cursos</span>
          </div>
          <div className="sabor-stat">
            <span className="sabor-stat-value">{obtenidos.length}</span>
            <span className="sabor-stat-label">Badges</span>
          </div>
        </div>

        <div className="sabor-profile-field">
          <label className="sabor-profile-label">Progreso total</label>
          <ProgressBar actual={cursosCompletados} total={5} label={`${cursosCompletados}/5 cursos`} />
        </div>

        {obtenidos.length > 0 && (
          <div className="sabor-profile-field">
            <label className="sabor-profile-label">Badges obtenidos</label>
            <div className="sabor-badges-grid">
              {obtenidos.map((b) => (
                <div key={b.id} className="sabor-badge-item" title={b.descripcion}>
                  <span style={{ fontSize: '1.3rem' }}>{b.icono}</span>
                  <span className="sabor-badge-nombre">{b.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="sabor-login-actions" style={{ marginTop: 16 }}>
          <button className="sabor-btn sabor-btn-secondary" onClick={onCerrar}>
            Cancelar
          </button>
          <button className="sabor-btn sabor-btn-primary" onClick={guardar}>
            Guardar
          </button>
        </div>
      </div>

      <style>{`
        .sabor-profile-modal { max-width: 420px; }
        .sabor-profile-avatar-section {
          display: flex; justify-content: center; margin-bottom: 16px;
        }
        .sabor-profile-avatar-grid {
          display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
        }
        .sabor-avatar-option {
          width: 48px; height: 48px; border-radius: 50%;
          border: 3px solid #e8e3de; background: #faf8f5;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: border-color 0.2s;
        }
        .sabor-avatar-active {
          border-color: #E86A33; background: #fff4e5;
        }
        .sabor-avatar-option:hover {
          border-color: #E86A33;
        }
        .sabor-profile-field {
          margin-bottom: 14px;
        }
        .sabor-profile-label {
          display: block; font-size: 0.85rem; font-weight: 600;
          color: #6b7280; margin-bottom: 6px;
        }
        .sabor-profile-stats {
          display: flex; gap: 12px; margin-bottom: 16px;
        }
        .sabor-stat {
          flex: 1; text-align: center;
          background: #faf8f5; border-radius: 12px;
          padding: 12px 8px;
        }
        .sabor-stat-value {
          display: block; font-size: 1.4rem; font-weight: 700; color: #E86A33;
        }
        .sabor-stat-label {
          font-size: 0.8rem; color: #6b7280;
        }
        .sabor-badges-grid {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .sabor-badge-item {
          display: flex; align-items: center; gap: 4px;
          background: #fff4e5; border: 1px solid #f5d6b8;
          padding: 6px 12px; border-radius: 99px;
          font-size: 0.85rem; color: #2d2a24;
        }
        .sabor-badge-nombre {
          font-size: 0.8rem; font-weight: 500;
        }
      `}</style>
    </div>
  );
}

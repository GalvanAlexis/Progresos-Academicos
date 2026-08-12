'use client';

import { useState } from 'react';

export default function AdminLogin({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (user === 'admin' && pass === 'sabor123') {
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="sabor-modal-overlay" onClick={onClose}>
      <div className="sabor-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="sabor-modal-title">Acceso Administrativo</h2>
        <form onSubmit={handleSubmit} className="sabor-login-form">
          <input
            className="sabor-input"
            placeholder="Usuario"
            value={user}
            onChange={(e) => { setUser(e.target.value); setError(false); }}
            autoFocus
          />
          <input
            className="sabor-input"
            type="password"
            placeholder="Contrasena"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setError(false); }}
          />
          {error && <p className="sabor-error">Usuario o contrasena incorrectos</p>}
          <div className="sabor-login-actions">
            <button type="button" className="sabor-btn sabor-btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="sabor-btn sabor-btn-primary">
              Ingresar
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .sabor-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .sabor-modal {
          background: #fff; border-radius: 16px;
          padding: 32px; width: 100%; max-width: 380px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .sabor-modal-title {
          margin: 0 0 20px; font-size: 1.3rem; color: #2d2a24;
          text-align: center;
        }
        .sabor-login-form {
          display: flex; flex-direction: column; gap: 12px;
        }
        .sabor-input {
          padding: 10px 14px; border: 1px solid #e8e3de; border-radius: 8px;
          font-size: 0.95rem; outline: none; transition: border-color 0.2s;
          background: #faf8f5;
        }
        .sabor-input:focus {
          border-color: #E86A33;
        }
        .sabor-error {
          color: #e53935; font-size: 0.85rem; margin: 0;
        }
        .sabor-login-actions {
          display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px;
        }
        .sabor-btn {
          padding: 8px 20px; border-radius: 8px; font-size: 0.9rem;
          border: none; cursor: pointer; font-weight: 600;
          transition: opacity 0.2s;
        }
        .sabor-btn:hover { opacity: 0.85; }
        .sabor-btn-primary {
          background: #E86A33; color: #fff;
        }
        .sabor-btn-secondary {
          background: #e8e3de; color: #2d2a24;
        }
      `}</style>
    </div>
  );
}

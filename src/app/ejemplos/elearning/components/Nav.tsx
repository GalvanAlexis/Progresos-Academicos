'use client';

import { useState } from 'react';
import Link from 'next/link';
import GatoChef from './GatoChef';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import type { AdminState } from '../hooks/useAdmin';

const AVATAR_MAP: Record<string, string> = {
  cat: '🐱', dog: '🐶', rabbit: '🐰', bear: '🐻', fox: '🦊', owl: '🦉',
};

export default function Nav({
  adminState,
  onUpdate,
  onReset,
  onOpenProfile,
}: {
  adminState: AdminState;
  onUpdate: (partial: Partial<AdminState>) => void;
  onReset: () => void;
  onOpenProfile?: () => void;
}) {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDash, setShowAdminDash] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const avatarEmoji = AVATAR_MAP[adminState.alumnoAvatar] || '🐱';

  return (
    <>
      <nav className="sabor-nav">
        <div className="sabor-nav-inner">
          <Link href="/ejemplos/elearning" className="sabor-nav-logo">
            <GatoChef size={28} />
            <span className="sabor-nav-brand">Sabor Academy</span>
          </Link>

          <div className="sabor-nav-right">
            <span className="sabor-nav-profile" title="Perfil" onClick={onOpenProfile} style={{ cursor: 'pointer' }}>
              <span className="sabor-nav-avatar">{avatarEmoji}</span>
              <span className="sabor-nav-name">{adminState.alumnoNombre}</span>
            </span>
            <button
              className="sabor-nav-admin-btn"
              onClick={() => setShowAdminLogin(true)}
              title="Admin"
            >
              ⚙️
            </button>
            <button
              className="sabor-nav-hamburguer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sabor-nav-mobile">
            <button className="sabor-nav-mobile-item" onClick={() => { onOpenProfile?.(); setMenuOpen(false); }}>
              <span className="sabor-nav-avatar" style={{ fontSize: '1.5rem' }}>{avatarEmoji}</span>
              <span>{adminState.alumnoNombre}</span>
            </button>
            <Link href="/servicios" className="sabor-nav-mobile-item">Servicios</Link>
            <Link href="/" className="sabor-nav-mobile-item">Inicio</Link>
            <button className="sabor-nav-mobile-item" onClick={() => { setShowAdminLogin(true); setMenuOpen(false); }}>
              Panel Admin
            </button>
          </div>
        )}
      </nav>

      {showAdminLogin && !adminState.adminAutenticado && (
        <AdminLogin
          onSuccess={() => {
            onUpdate({ adminAutenticado: true });
            setShowAdminLogin(false);
            setShowAdminDash(true);
          }}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {showAdminDash && adminState.adminAutenticado && (
        <AdminDashboard
          state={adminState}
          onUpdate={onUpdate}
          onReset={onReset}
          onClose={() => setShowAdminDash(false)}
        />
      )}

      <style>{`
        .sabor-nav {
          position: sticky; top: 0; z-index: 100;
          background: #fff; border-bottom: 1px solid #e8e3de;
        }
        .sabor-nav-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-between;
          height: 56px; padding: 0 16px;
        }
        .sabor-nav-logo {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none;
        }
        .sabor-nav-brand {
          font-size: 1.1rem; font-weight: 700; color: #2d2a24;
        }
        .sabor-nav-right {
          display: flex; align-items: center; gap: 12px;
        }
        .sabor-nav-profile {
          display: flex; align-items: center; gap: 6px;
          cursor: default;
        }
        .sabor-nav-avatar {
          font-size: 1.2rem;
        }
        .sabor-nav-name {
          font-size: 0.9rem; font-weight: 500; color: #2d2a24;
        }
        .sabor-nav-admin-btn {
          background: none; border: none;
          font-size: 1.1rem; cursor: pointer;
          padding: 4px; border-radius: 6px;
          transition: background 0.2s;
        }
        .sabor-nav-admin-btn:hover {
          background: #faf8f5;
        }
        .sabor-nav-hamburguer {
          display: none; background: none; border: none;
          font-size: 1.4rem; cursor: pointer;
          padding: 4px;
        }
        .sabor-nav-mobile {
          display: none; flex-direction: column;
          border-top: 1px solid #e8e3de;
          background: #fff; padding: 8px 0;
        }
        .sabor-nav-mobile-item {
          padding: 12px 16px; font-size: 0.95rem;
          color: #2d2a24; text-decoration: none;
          background: none; border: none; text-align: left;
          cursor: pointer; font-family: inherit;
        }
        .sabor-nav-mobile-item:hover {
          background: #faf8f5;
        }
        @media (max-width: 640px) {
          .sabor-nav-hamburguer { display: block; }
          .sabor-nav-mobile { display: flex; }
          .sabor-nav-name, .sabor-nav-admin-btn { display: none; }
        }
      `}</style>
    </>
  );
}

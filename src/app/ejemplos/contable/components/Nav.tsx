'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const GRANATE = '#7a1a1a';
const GRANATE_DARK = '#5a1010';
const TEXT_SEC = '#5a5550';
const BG_WARM = '#f5f3f0';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Trayectoria', href: '#metrics' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.href.slice(1))).filter(Boolean) as HTMLElement[];
    const links = navRef.current?.querySelectorAll('.con-scroll-link');

    if (!links || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => {
              const anchor = link as HTMLAnchorElement;
              const href = anchor.getAttribute('href')?.slice(1);
              anchor.classList.toggle('con-nav-active', href === entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, close]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    close();
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: 'smooth' });
  }, [close]);

  const handleLoginClick = useCallback(() => {
    setOpen(false);
    setShowLogin(true);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setShowLogin(false);
    setShowDash(true);
  }, []);

  const panel = open ? (
    <>
      <div key="con-overlay" onClick={close} />
      <nav key="con-panel" >
        {NAV_ITEMS.map((item, i) => (
          <a key={item.label} href={item.href} className="con-scroll-link con-mobile-link" onClick={(e) => handleLinkClick(e, item.href)}
            
            
            
          >
            {item.label}
          </a>
        ))}
        <div>
          <button className="con-mobile-admin" onClick={() => { setOpen(false); setShowLogin(true); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
            </svg>
            Ingresar
          </button>
        </div>
      </nav>
    </>
  ) : null;

  return (
    <>
      {/* ─── Top Bar ─── */}
      <div>
        <div>
          <span>&#9742; (02241) 45-6789</span>
          <span>&#9993; estudio@mya-contable.com.ar</span>
        </div>
        <span className="con-topbar-hours">Lun a Vie 9:00 - 18:00</span>
      </div>

      {/* ─── Nav ─── */}
      <nav ref={navRef} >
        <div>
          <div>
            <a href="/servicios" >
              &larr; Servicios
            </a>
            <span>M&amp;A</span>
          </div>

          {/* Desktop links */}
          <div className="con-nav-desktop" >
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="con-scroll-link" onClick={(e) => handleLinkClick(e, item.href)}
                
              >
                {item.label}
              </a>
            ))}
            <button className="con-login-btn" onClick={handleLoginClick} aria-label="Ingresar" >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
              </svg>
              <span>Admin</span>
            </button>
          </div>

          {/* Hamburger (mobile) */}
          <button className="con-hamburger" onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          >
            <span className={`con-ham-line ${open ? 'con-ham-open' : ''}`} />
          </button>
        </div>
      </nav>

      {typeof document !== 'undefined' && createPortal(
        panel,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AdminLogin open={showLogin} onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />,
        document.body
      )}
      {typeof document !== 'undefined' && createPortal(
        <AdminDashboard open={showDash} onClose={() => setShowDash(false)} />,
        document.body
      )}

      <style>{`
        .con-nav-desktop { display: flex; align-items: center; gap: 20px; }
        .con-topbar-hours { display: inline; }
        @media (max-width: 480px) {
          .con-topbar-hours { display: none; }
        }
        .con-hamburger {
          display: none;
          background: none; border: none; cursor: pointer;
          width: 28px; height: 28px;
          padding: 4px;
          position: relative;
          z-index: 100;
        }
        .con-ham-line,
        .con-ham-line::before,
        .con-ham-line::after {
          display: block;
          width: 100%; height: 2px;
          background: #1a1a1a;
          border-radius: 2px;
          transition: all 0.3s ease;
          position: absolute;
          left: 0;
        }
        .con-ham-line {
          top: 50%; transform: translateY(-50%);
        }
        .con-ham-line::before {
          content: '';
          top: -7px;
        }
        .con-ham-line::after {
          content: '';
          top: 7px;
        }
        .con-ham-line.con-ham-open {
          background: transparent;
        }
        .con-ham-line.con-ham-open::before {
          top: 0; transform: rotate(45deg);
        }
        .con-ham-line.con-ham-open::after {
          top: 0; transform: rotate(-45deg);
        }
        .con-mobile-link {
          font-size: 18px !important;
          font-weight: 600 !important;
          padding: 14px 0;
          border-bottom: 1px solid rgba(122,26,26,0.08);
          text-decoration: none;
          color: #1a1a1a !important;
        }
        .con-mobile-link.con-nav-active {
          color: ${GRANATE} !important;
        }
        .con-mobile-admin {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          padding: 14px 18px;
          height: auto;
          background: rgba(122,26,26,0.08);
          border: 1px solid rgba(122,26,26,0.15);
          color: #1a1a1a;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .con-mobile-admin:hover {
          background: rgba(122,26,26,0.15);
        }
        .con-scroll-link.con-nav-active {
          color: ${GRANATE} !important;
          font-weight: 600 !important;
        }
        .con-login-btn:hover {
          color: ${GRANATE};
          border-color: ${GRANATE};
          background: rgba(122,26,26,0.05);
        }
        @media (max-width: 768px) {
          .con-nav-desktop { display: none; }
          .con-hamburger { display: block; }
        }
      `}</style>
    </>
  );
}

'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="sabor-footer">
      <div className="sabor-footer-inner">
        <p className="sabor-footer-text">
          Sabor Academy &mdash; Un ejemplo de plataforma e-learning por{' '}
          <Link href="/" className="sabor-footer-link">BladoPC</Link>
        </p>
        <div className="sabor-footer-links">
          <Link href="/servicios" className="sabor-footer-link">Servicios</Link>
          <Link href="/ejemplos/landing" className="sabor-footer-link">Lumina</Link>
          <Link href="/ejemplos/contable" className="sabor-footer-link">M&amp;A</Link>
          <Link href="/ejemplos/delivery" className="sabor-footer-link">Sabor Express</Link>
          <Link href="/ejemplos/dashboard" className="sabor-footer-link">Dashboard</Link>
        </div>
      </div>
      <style>{`
        .sabor-footer {
          background: #faf8f5;
          border-top: 1px solid #e8e3de;
          padding: 24px 16px;
          margin-top: 60px;
        }
        .sabor-footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sabor-footer-text {
          color: #6b7280;
          font-size: 0.85rem;
          margin: 0;
        }
        .sabor-footer-link {
          color: #E86A33;
          text-decoration: none;
          font-size: 0.85rem;
          transition: opacity 0.2s;
        }
        .sabor-footer-link:hover {
          opacity: 0.7;
          text-decoration: underline;
        }
        .sabor-footer-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .sabor-footer-inner {
            flex-direction: column;
            text-align: center;
          }
          .sabor-footer-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAppContext } from '@/lib/AppContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <nav
      aria-label="Navegacion principal"
      className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center"
      style={{
        background: scrolled
          ? 'var(--background)'
          : 'linear-gradient(to bottom, var(--background), var(--nav-bg-to, transparent))',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="h-full w-full px-4 sm:px-6 flex items-center justify-between">

        {/* Izquierda: hamburger + logo */}
        <div className="flex items-center gap-4">

          {/* Hamburger minimalista nativo */}
          <button
            popoverTarget="mobile-menu"
            className="p-1 rounded sm:hidden"
            title="Abrir menú"
            aria-label="Toggle mobile menu"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted)',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logotipo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="text-sm font-semibold tracking-tight select-none transition-opacity group-hover:opacity-80"
              style={{ color: 'var(--foreground)' }}
            >
              Portfolio
            </span>
          </Link>
        </div>

        {/* Derecha */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted)',
              padding: '6px',
              borderRadius: '6px',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              lineHeight: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--foreground)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Volver (solo en subpages) */}
          {!isHome && (
            <button
              onClick={() => router.push('/')}
              className="text-xs transition-colors hidden sm:block"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              &larr; Volver
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

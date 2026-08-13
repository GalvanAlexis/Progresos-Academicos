'use client';

import { useRef, useState } from 'react';
import type { ServicioItem } from '../hooks/useAdmin';

const GRANATE = '#7a1a1a';
const GRANATE_LIGHT = '#9a2a2a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  servicios: ServicioItem[];
}

export default function Servicios({ servicios }: Props) {
  const ref = useRef(null);
  
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="servicios" >
      <div ref={ref} >
        <div >
          <p>
            Servicios
          </p>
          <h2>
            Todo lo que tu negocio necesita
          </h2>
          <p>
            Toca cada servicio para ver los detalles. Desde monotributo hasta sociedades completas.
          </p>
        </div>

        {servicios.map((s, i) => {
          const isOpen = expanded === s.id;
          return (
            <div key={s.id} className="con-servicio-card" onClick={() => setExpanded(isOpen ? null : s.id)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 'clamp(16px, 3vw, 48px)',
                marginBottom: i < servicios.length - 1 ? 16 : 0,
                background: i % 2 === 0 ? '#fff' : BG_SECTION,
                borderRadius: 12,
                padding: 'clamp(16px, 3vw, 32px)',
                border: isOpen
                  ? `1px solid ${GRANATE}20`
                  : '1px solid transparent',
                cursor: 'pointer',
                transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div>
                <div>
                  <h3>
                    {s.titulo}
                  </h3>
                  {s.publico && (
                    <span className="con-servicio-tag" >
                      {s.publico}
                    </span>
                  )}
                </div>
                <p>
                  {s.desc}
                </p>
                {s.precio && (
                  <div>
                    {s.precio}
                  </div>
                )}

                
                  {isOpen && s.detalle && (
                    <div key="detalle" >
                      <div>
                        {s.detalle}
                      </div>
                    </div>
                  )}
                

                <div>
                  {isOpen ? 'Ver menos' : 'Ver detalle completo'}
                  <span>
                    &#9660;
                  </span>
                </div>
              </div>
              <div className="con-servicio-circle" style={{ flex: '0 0 64px', height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${GRANATE} 0%, ${GRANATE_LIGHT} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 300, fontFamily: 'serif', }} >
                {s.titulo[0]}
              </div>
            </div>
          );
        })}
        <style>{`
          .con-servicio-card { flex-direction: row; }
          .con-servicio-circle { flex: 0 0 64px; height: 64px; }
          @media (max-width: 600px) {
            .con-servicio-card { flex-direction: column !important; text-align: center; }
            .con-servicio-circle { flex: 0 0 48px !important; width: 48px !important; height: 48px !important; font-size: 18px !important; margin-top: 8px; order: -1; }
            .con-servicio-tag { white-space: normal !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

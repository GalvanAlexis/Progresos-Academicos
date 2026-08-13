'use client';

import { useRef } from 'react';
import type { Miembro } from '../hooks/useAdmin';

const GRANATE = '#7a1a1a';
const GRANATE_LIGHT = '#9a2a2a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  equipo: Miembro[];
}

export default function Equipo({ equipo }: Props) {
  const ref = useRef(null);
  

  return (
    <section id="equipo" >
      <div ref={ref} >
        <div >
          <p>
            Equipo
          </p>
          <h2>
            Conocenos
          </h2>
          <p>
            Detras de cada servicio hay personas comprometidas con tu tranquilidad fiscal.
          </p>
        </div>

        <div>
          {equipo.map((m, i) => (
            <div key={m.id} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)'; }}
            >
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${GRANATE} 0%, ${GRANATE_LIGHT} 100%)`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 600, }} >
                {m.nombre.split(' ')[1]?.[0] ?? m.nombre[0]}
              </div>
              <h3>
                {m.nombre}
              </h3>
              <p>
                {m.rol}
              </p>
              <p>
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

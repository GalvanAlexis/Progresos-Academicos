'use client';

import { useRef } from 'react';
import type { RecursoItem } from '../hooks/useAdmin';

const GRANATE = '#7a1a1a';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

const GOV_LINKS: Record<string, string> = {
  '1': 'https://www.afip.gob.ar/monotributo/',
  '2': 'https://www.argentina.gob.ar/arca',
};

interface Props {
  recursos: RecursoItem[];
}

export default function Recursos({ recursos }: Props) {
  const ref = useRef(null);
  

  return (
    <section id="recursos" >
      <div ref={ref} >
        <div >
          <p>
            Recursos
          </p>
          <h2>
            Sitios de interes
          </h2>
          <p>
            Accede a los portales oficiales del gobierno argentino para tus tramites.
          </p>
        </div>

        <div>
          {recursos.length === 0 && (
            <p>
              No hay recursos disponibles.
            </p>
          )}
          {recursos.map((r, i) => {
            const url = GOV_LINKS[r.id] || 'https://www.argentina.gob.ar/';
            return (
              <div key={r.id} >
                <div>
                  <div />
                  <h3>
                    {r.titulo}
                  </h3>
                  <p>
                    {r.desc}
                  </p>
                  <a href={url} target="_blank" rel="noopener noreferrer" >
                    Ir al sitio &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

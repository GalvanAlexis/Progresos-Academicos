'use client';

import { useRef } from 'react';
import type { HistoriaItem } from '../hooks/useAdmin';

const GRANATE = '#7a1a1a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  historia: HistoriaItem[];
}

export default function Timeline({ historia }: Props) {
  const ref = useRef(null);
  

  return (
    <section id="historia" >
      <div ref={ref} >
        <div >
          <p>
            Historia
          </p>
          <h2>
            Nuestra trayectoria
          </h2>
          <p>
            Desde 2012 acompanando el crecimiento de PyMEs y profesionales en Chascomus.
          </p>
        </div>

        <div>
          <div />
          {historia.map((t, i) => (
            <div key={t.id} >
              <div>
                {t.year.slice(2)}
              </div>
              <div>
                <div>
                  {t.year}
                </div>
                <p>
                  {t.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

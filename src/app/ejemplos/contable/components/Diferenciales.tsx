'use client';

import { useRef } from 'react';
const GRANATE = '#7a1a1a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

const DIFERENCIALES = [
  { titulo: 'Respuesta en menos de 24h', desc: 'Consultas respondidas dentro del dia habil. Sin esperas ni mensajes sin respuesta.' },
  { titulo: 'Atencion personalizada', desc: 'Un contador asignado por cliente. Conoces a quien te atiende y el te conoce a vos.' },
  { titulo: 'Precios claros', desc: 'Honorarios fijos y previsibles desde el inicio. Sin cargos sorpresa ni facturas inesperadas.' },
  { titulo: 'Plataforma online', desc: 'Portal digital para subir y descargar tus documentos, recibir recordatorios y ver el estado de tus tramites.' },
];

export default function Diferenciales() {
  const ref = useRef(null);
  

  return (
    <section id="por-que" >
      <div ref={ref} >
        <div >
          <h2>
            Por que elegirnos
          </h2>
          <p>
            No somos un estudio mas. Estos son los valores que nos diferencian.
          </p>
        </div>

        <div>
          {DIFERENCIALES.map((d, i) => (
            <div key={d.titulo} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div>
                &#10003;
              </div>
              <h3>
                {d.titulo}
              </h3>
              <p>
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

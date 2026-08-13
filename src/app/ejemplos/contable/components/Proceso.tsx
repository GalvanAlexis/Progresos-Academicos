'use client';

import { useRef, useState } from 'react';
const GRANATE = '#7a1a1a';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

const PROCESO = [
  {
    paso: 1,
    titulo: 'Consulta inicial gratuita',
    desc: 'Nos reunimos sin cargo para entender tu negocio, tus necesidades y explicarte como trabajamos. Sin compromiso.',
    detalle: 'Te invitamos a una reunion sin cargo de 30 minutos. Vas a conocer al equipo, entender nuestra metodologia de trabajo y recibir un diagnostico preliminar de tu situacion. No necesitas traer nada, solo tu CUIT y ganas de ordenar tus cuentas.',
  },
  {
    paso: 2,
    titulo: 'Diagnostico y plan',
    desc: 'Analizamos tu situacion actual, detectamos oportunidades de ahorro y armamos un plan de trabajo con plazos y honorarios claros.',
    detalle: 'Analizamos en profundidad tu situacion impositiva, contable y laboral. Detectamos oportunidades de ahorro fiscal, riesgos de multas y puntos a regularizar. Te entregamos un plan de trabajo detallado con plazos, responsables y honorarios completamente transparentes.',
  },
  {
    paso: 3,
    titulo: 'Implementacion',
    desc: 'Ponemos en marcha el plan: registraciones, presentaciones, regularizaciones. Te asignamos un contador responsable.',
    detalle: 'Ponemos en marcha el plan acordado: inscripciones, registraciones contables, presentacion de declaraciones juradas, regularizacion de deudas. Te asignamos un contador responsable que seguira tu caso de principio a fin y estara disponible para consultas.',
  },
  {
    paso: 4,
    titulo: 'Acompanamiento continuo',
    desc: 'Seguimiento mensual, consultas por WhatsApp, recordatorios de vencimientos y reunion anual de balance.',
    detalle: 'Una vez al mes recibis un resumen de tu situacion fiscal, recordatorios de vencimientos y acceso a nuestra plataforma online. Tenes WhatsApp directo con tu contador para consultas rapidas. Cada ano hacemos una reunion de balance para proyectar el siguiente.',
  },
];

export default function Proceso() {
  const ref = useRef(null);
  
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="proceso" >
      <div />
      <div ref={ref} >
        <div >
          <p>
            Proceso
          </p>
          <h2>
            Como trabajamos
          </h2>
          <p>
            Toca cada paso para ver los detalles. Un proceso simple y transparente.
          </p>
        </div>

        <div>
          {PROCESO.map((p, i) => {
            const isOpen = expanded === p.paso;
            return (
              <div key={p.paso} onClick={() => setExpanded(isOpen ? null : p.paso)}
                style={{
                  background: '#fff',
                  borderRadius: 10,
                  padding: 28,
                  boxShadow: isOpen
                    ? '0 4px 24px rgba(122,26,26,0.10)'
                    : '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                  border: isOpen
                    ? `1px solid ${GRANATE}20`
                    : '1px solid rgba(0,0,0,0.04)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(122,26,26,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)';
                  }
                }}
              >
                <div>
                  {p.paso}
                </div>
                <h3>
                  {p.titulo}
                </h3>
                <p>
                  {p.desc}
                </p>

                
                  {isOpen && (
                    <div key="detalle" >
                      <div>
                        {p.detalle}
                      </div>
                    </div>
                  )}
                

                <div>
                  {isOpen ? 'Ver menos' : 'Ver detalle'}
                  <span>
                    &#9660;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {PROCESO.length > 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PROCESO.length - 1}, 1fr)`, gap: 24, marginTop: 16, padding: '0 18px', }} >
            {Array.from({ length: PROCESO.length - 1 }).map((_, i) => (
              <div key={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

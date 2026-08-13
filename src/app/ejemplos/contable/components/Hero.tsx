'use client';

import PresupuestoForm from './PresupuestoForm';

const GRANATE = '#7a1a1a';
const GRANATE_DARK = '#5a1010';
const GRANATE_LIGHT = '#9a2a2a';

interface Props {
  tagline: string;
  desc: string;
}

export default function Hero({ tagline, desc }: Props) {
  return (
    <section id="hero" style={{ minHeight: '85dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: `linear-gradient(135deg, ${GRANATE_DARK} 0%, ${GRANATE} 50%, ${GRANATE_LIGHT} 100%)`, overflow: 'hidden', }} >
      <div />
      <div>
        <p>
          {tagline}
        </p>
        <h1>
          Tu contador de confianza,
          <br />
          <span>siempre cerca</span>
        </h1>
        <p>
          {desc}
        </p>
        <div>
          <PresupuestoForm label="Solicitar presupuesto" />
          <a href="#servicios" >
            Conocer servicios
          </a>
        </div>
      </div>
    </section>
  );
}

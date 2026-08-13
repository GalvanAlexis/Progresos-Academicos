'use client';

import PresupuestoForm from './PresupuestoForm';

const GRANATE = '#7a1a1a';
const GRANATE_DARK = '#5a1010';
const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

function ctaBtn(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    display: 'inline-block',
    padding: '14px 36px',
    borderRadius: 6,
    background: GRANATE,
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    ...extra,
  };
}

export default function Contacto() {
  return (
    <>
      <section id="contacto" >
        <div>
          <p>
            Contacto
          </p>
          <h2>
            Trabajemos juntos
          </h2>
          <p>
            Dejanos tus datos y te llamamos en menos de 24h para coordinar una primera reunion sin cargo.
          </p>
          <div>
            <div><strong>Direccion:</strong> Av. Lastra 320, Chascomus</div>
            <div><strong>Telefono:</strong> (02241) 45-6789</div>
            <div><strong>Email:</strong> estudio@mya-contable.com.ar</div>
            <div><strong>Horario:</strong> Lun a Vie 9:00 - 18:00</div>
          </div>
          <div>
            <div>
              <div>Av. Lastra 320</div>
              <div>Chascomus, Provincia de Buenos Aires</div>
              <div>Ver en Google Maps &rarr;</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Sticky Mobile CTA --- */}
      <div className="con-mobile-cta" >
        <PresupuestoForm label="Solicitar presupuesto gratis" btnStyle={ctaBtn({ width: '100%', textAlign: 'center', padding: 12 })} />
      </div>

      <style>{`
        .con-mobile-cta { display: none !important; }
        @media (max-width: 768px) {
          .con-mobile-cta { display: flex !important; }
        }
      `}</style>
    </>
  );
}

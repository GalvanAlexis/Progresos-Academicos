'use client';

import GatoChef from './GatoChef';

export default function Certificate({
  alumnoNombre,
  cursoTitulo,
  onCerrar,
}: {
  alumnoNombre: string;
  cursoTitulo: string;
  onCerrar: () => void;
}) {
  const hoy = new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="sabor-modal-overlay" onClick={onCerrar}>
      <div className="sabor-cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sabor-cert-paper">
          <div className="sabor-cert-border">
            <div className="sabor-cert-header">
              <GatoChef size={50} />
              <h2 className="sabor-cert-title">Sabor Academy</h2>
              <p className="sabor-cert-subtitle">Certificado de Finalizacion</p>
            </div>

            <p className="sabor-cert-body">
              Este certificado otorga que
            </p>
            <p className="sabor-cert-name">{alumnoNombre}</p>
            <p className="sabor-cert-body">
              ha completado satisfactoriamente el curso
            </p>
            <p className="sabor-cert-course">{cursoTitulo}</p>

            <div className="sabor-cert-footer">
              <div className="sabor-cert-date">
                <p>Fecha: {hoy}</p>
              </div>
              <div className="sabor-cert-stamp">
                <span className="sabor-cert-stamp-text">SABOR ACADEMY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sabor-cert-actions" style={{ marginTop: 20, textAlign: 'center' }}>
          <button className="sabor-btn sabor-btn-secondary" onClick={() => alert('Descarga simulada! (captura de pantalla)')}>
            Descargar
          </button>
          <button className="sabor-btn sabor-btn-primary" onClick={onCerrar} style={{ marginLeft: 10 }}>
            Cerrar
          </button>
        </div>
      </div>

      <style>{`
        .sabor-cert-modal {
          max-width: 520px; width: 100%; padding: 16px;
        }
        .sabor-cert-paper {
          background: #fdf6ec;
          border: 2px solid #e8d5b5;
          border-radius: 20px;
          padding: 8px;
        }
        .sabor-cert-border {
          border: 2px dashed #d4b896;
          border-radius: 14px;
          padding: 32px 24px;
          text-align: center;
        }
        .sabor-cert-header {
          margin-bottom: 20px;
        }
        .sabor-cert-header svg {
          margin: 0 auto 8px;
          display: block;
        }
        .sabor-cert-title {
          font-size: 1.6rem; font-weight: 800;
          color: #E86A33; margin: 0 0 4px;
          letter-spacing: 0.05em;
        }
        .sabor-cert-subtitle {
          font-size: 0.9rem; color: #8b7355;
          text-transform: uppercase; letter-spacing: 0.1em;
          margin: 0;
        }
        .sabor-cert-body {
          font-size: 0.95rem; color: #6b6355; margin: 0 0 8px;
        }
        .sabor-cert-name {
          font-size: 1.5rem; font-weight: 700;
          color: #2d2a24; margin: 4px 0 12px;
          font-style: italic;
        }
        .sabor-cert-course {
          font-size: 1.1rem; font-weight: 700;
          color: #E86A33; margin: 4px 0 20px;
        }
        .sabor-cert-footer {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-top: 24px;
          gap: 16px; flex-wrap: wrap;
        }
        .sabor-cert-date p {
          font-size: 0.85rem; color: #6b6355; margin: 0;
        }
        .sabor-cert-stamp {
          width: 90px; height: 90px;
          border: 3px solid #E86A33; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-15deg);
        }
        .sabor-cert-stamp-text {
          font-size: 0.6rem; font-weight: 800; color: #E86A33;
          text-align: center; line-height: 1.2;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}

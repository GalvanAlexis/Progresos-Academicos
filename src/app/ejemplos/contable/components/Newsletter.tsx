'use client';

import { useState } from 'react';
const GRANATE = '#7a1a1a';
const GRANATE_LIGHT = '#9a2a2a';
const BG_WARM = '#f5f3f0';

export default function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section id="newsletter" style={{ padding: 'clamp(60px, 10vh, 100px) 24px', background: `linear-gradient(135deg, ${GRANATE} 0%, ${GRANATE_LIGHT} 100%)`, color: '#fff', }} >
      <div>
        {sent ? (
          <div>
            <div>
              &#10003;
            </div>
            <h2>
              Suscripcion confirmada
            </h2>
            <p>
              Gracias por suscribirte. Vas a recibir novedades impositivas, guias y recursos exclusivos directamente en tu correo.
            </p>
            <button type="button" onClick={() => setSent(false)}
              
            >
              Volver
            </button>
          </div>
        ) : (
          <>
            <h2>
              Recibi novedades y recursos exclusivos
            </h2>
            <p>
              Suscribite a nuestro newsletter y recibi guias impositivas, calendarios de vencimientos y consejos para tu negocio.
            </p>
            <div>
              <input type="email" defaultValue="ejemplo@correo.com" onFocus={(e) => {
                  if (e.target.value === 'ejemplo@correo.com') e.target.select();
                }}
                
              />
              <button type="button" onClick={() => setSent(true)}
                
              >
                Suscribirme
              </button>
            </div>
            <p>
              Sin spam. Puedes darte de baja en cualquier momento.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

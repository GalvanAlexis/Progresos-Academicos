'use client';

import { useState, useEffect, useCallback } from 'react';
const GRANATE = '#7a1a1a';
const BG_WARM = '#f5f3f0';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

interface Props {
  label?: string;
  btnStyle?: React.CSSProperties;
}

export default function PresupuestoForm({ label = 'Solicitar presupuesto', btnStyle }: Props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [nombre] = useState('Juan Perez');
  const [contacto] = useState('juan@ejemplo.com');
  const [mensaje] = useState('Hola, quiero saber mas sobre sus servicios contables para mi negocio.');

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setState('success');
  }

  const handleClose = useCallback(() => {
    setOpen(false);
    setState('idle');
  }, []);

  const defaultBtn: React.CSSProperties = {
    display: 'inline-block', padding: '14px 36px', borderRadius: 6,
    background: '#fff', color: GRANATE, fontSize: 14, fontWeight: 600,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        
      >
        {label}
      </button>

      
        {open && (
          <div onClick={handleClose} >
            <div key="modal" onClick={(e) => e.stopPropagation()}
              
            >
              <button onClick={handleClose} >
                &#10005;
              </button>

              {state === 'success' ? (
                <div>
                  <div>&#10003;</div>
                  <h3>
                    Consulta enviada
                  </h3>
                  <p>
                    Gracias por tu consulta. Te contactaremos en menos de 24h.
                  </p>
                  <button onClick={handleClose} >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} >
                  <h2>
                    Solicitar presupuesto
                  </h2>
                  <p>
                    Dejanos tus datos y te llamamos en menos de 24h.
                  </p>

                  <div>
                    <label>
                      Nombre
                    </label>
                    <input required readOnly value={nombre} />
                  </div>
                  <div>
                    <label>
                      Email o telefono
                    </label>
                    <input required readOnly value={contacto} />
                  </div>
                  <div>
                    <label>
                      Mensaje
                    </label>
                    <textarea required readOnly value={mensaje} />
                  </div>
                  <button type="submit" disabled={state === 'loading'} >
                    {state === 'loading' ? 'Enviando...' : 'Enviar consulta'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      
    </>
  );
}

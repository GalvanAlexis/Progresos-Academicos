'use client';

import { useRef } from 'react';
import type { FAQItem } from '../hooks/useAdmin';

const BG_SECTION = '#edeae5';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';
const GRANATE = '#7a1a1a';

interface Props {
  faq: FAQItem[];
}

export default function FAQ({ faq }: Props) {
  const ref = useRef(null);
  

  return (
    <section id="faq" >
      <div ref={ref} >
        <div >
          <p>
            FAQ
          </p>
          <h2>
            Preguntas frecuentes
          </h2>
          <p>
            Las dudas mas comunes que recibimos. Si tenes otra, consultanos sin compromiso.
          </p>
        </div>

        <div>
          {faq.length === 0 && (
            <p>
              No hay preguntas frecuentes cargadas.
            </p>
          )}
          {faq.map((item, i) => (
            <div key={item.id} >
              <details name="con-faq" >
                <summary>
                  {item.q}
                  <span className="con-faq-icon" >
                    +
                  </span>
                </summary>
                <div>
                  {item.a}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `{ document.querySelectorAll('details[name="con-faq"]').forEach(function(d){ d.addEventListener('toggle', function(){ var icon = d.querySelector('.con-faq-icon'); if (icon) icon.style.transform = d.open ? 'rotate(45deg)' : 'rotate(0deg)'; }); }); }()`, }} />
    </section>
  );
}

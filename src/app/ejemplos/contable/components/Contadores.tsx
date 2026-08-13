'use client';

import { useEffect, useRef, useState } from 'react';
const GRANATE = '#7a1a1a';
const TEXT_SEC = '#5a5550';

const METRICS = [
  { target: 12, suffix: '+', label: 'anos de experiencia' },
  { target: 350, suffix: '+', label: 'clientes activos' },
  { target: 2000, suffix: '+', label: 'declaraciones anuales' },
  { target: 98, suffix: '%', label: 'retencion de clientes' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = true;
  const done = useRef(false);

  useEffect(() => {
    if (!isInView || done.current) return;
    done.current = true;
    const duration = 1500;
    const start = performance.now();

    function update(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Contadores() {
  const ref = useRef(null);
  const isInView = true;

  return (
    <section ref={ref} id="metrics">
      <div>
        {METRICS.map((m, i) => (
          <div key={m.label}>
            <div>
              <AnimatedCounter target={m.target} suffix={m.suffix} />
            </div>
            <div>{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

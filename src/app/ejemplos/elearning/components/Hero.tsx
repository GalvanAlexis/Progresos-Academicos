'use client';

import GatoChef from './GatoChef';

const HERO_IMG = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80';

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="sabor-hero">
      <div className="sabor-hero-bg" />
      <div className="sabor-hero-content">
        <h1 className="sabor-hero-title">Sabor Academy</h1>
        <p className="sabor-hero-sub">
          Aprende a cocinar como un chef profesional con cursos paso a paso, quizzes y certificados.
        </p>
        <button className="sabor-hero-cta" onClick={onCtaClick}>
          Empezar a cocinar
        </button>
      </div>
      <div className="sabor-hero-mascota">
        <GatoChef size={100} />
      </div>
      <style>{`
        .sabor-hero {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 40px 16px;
        }
        .sabor-hero-bg {
          position: absolute; inset: 0;
          background: url(${HERO_IMG}) center/cover no-repeat;
          filter: brightness(0.6);
          z-index: 0;
        }
        .sabor-hero-content {
          position: relative; z-index: 1;
          text-align: center;
          max-width: 600px;
          animation: saborFadeIn 1s ease;
        }
        .sabor-hero-title {
          font-size: clamp(2.2rem, 6vw, 3.6rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }
        .sabor-hero-sub {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: rgba(255,255,255,0.85);
          line-height: 1.5;
          margin: 0 0 28px;
        }
        .sabor-hero-cta {
          padding: 14px 36px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          background: #E86A33;
          color: #fff;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sabor-hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(232,106,51,0.4);
        }
        .sabor-hero-mascota {
          position: absolute;
          bottom: 20px;
          right: clamp(20px, 5vw, 60px);
          z-index: 1;
          animation: saborFloat 3s ease-in-out infinite;
        }
        @keyframes saborFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes saborFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 640px) {
          .sabor-hero-mascota {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

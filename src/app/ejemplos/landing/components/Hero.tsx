'use client';

import { useState, useRef, useCallback } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useAdmin } from '../hooks/useAdmin';
import { GALERIA_IMAGES } from './Galeria';
import Galeria from './Galeria';
import Cart from './Cart';

export const PRODUCT = {
  name: 'Lumina Serum Facial',
  desc: 'Serum facial organico con acido hialuronico, vitamina C y aceite de rosa mosqueta. Hidratacion profunda sin quimicos agresivos.',
  benefits: ['Hidratacion 24h', '100% Natural', 'Antioxidante Potente'],
  ingredients: ['Acido Hialuronico', 'Vitamina C', 'Rosa Mosqueta', 'Aloe Vera', 'Colageno Vegetal', 'Aceite de Jojoba'],
};

export default function Hero() {
  const [showDialog, setShowDialog] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const dialogQtyRef = useRef<HTMLInputElement>(null);
  const mouse = useMousePosition(sectionRef);
  const { mainPrice } = useAdmin();

  const rotateX = mouse.isWithin ? (mouse.progressY - 0.5) * -10 : 0;
  const rotateY = mouse.isWithin ? (mouse.progressX - 0.5) * 10 : 0;

  const openDialog = useCallback(() => setShowDialog(true), []);
  const closeDialog = useCallback(() => setShowDialog(false), []);

  const handleAddToCart = useCallback(() => {
    closeDialog();
    setShowCart(true);
  }, [closeDialog]);

  return (
    <>
      <section id="hero" ref={sectionRef} className="lum-section lum-hero">
        <div className="lum-hero-divider" />
        <div className="lum-hero-content">
          <p className="lum-badge" >
            Nueva formula 2026
          </p>
          <h1 className="lum-hero-title" >
            Tu piel merece <span className="lum-accent">lo natural</span>
          </h1>
          <p className="lum-hero-desc" >
            {PRODUCT.desc}
          </p>
          <div className="lum-hero-actions" >
            <span className="lum-price" >
              ${mainPrice.toLocaleString('es-AR')}
            </span>
            <button onClick={openDialog} className="lum-btn lum-btn-primary" >
              Comprar ahora
            </button>
          </div>
          <p className="lum-hero-footnote" >
            Envio gratis a todo Argentina · Paga en hasta 6 cuotas
          </p>
        </div>
        <div className="lum-hero-visual">
          <div className="lum-hero-glow" />
          <Galeria rotateX={rotateX} rotateY={rotateY} />
        </div>
      </section>

      
        {showDialog && (
          <>
            <div key="lum-dialog-backdrop" onClick={closeDialog} />
            <div>
              <article key="lum-dialog" className="lum-dialog" >
                <button onClick={closeDialog} aria-label="Cerrar" >
                  &times;
                </button>
                <div className="lum-dialog-grid">
                  <div className="lum-dialog-img-wrap">
                    <img src={GALERIA_IMAGES[0].src} alt={PRODUCT.name} width="280" height="400" className="lum-dialog-img" />
                  </div>
                  <div className="lum-dialog-info">
                    <h2 className="lum-dialog-title">{PRODUCT.name}</h2>
                    <p className="lum-dialog-desc">{PRODUCT.desc}</p>
                    <div className="lum-dialog-benefits">
                      {PRODUCT.benefits.map((b) => (
                        <span key={b} className="lum-dialog-badge">{b}</span>
                      ))}
                    </div>
                    <p className="lum-dialog-price" >
                      $ {mainPrice.toLocaleString('es-AR')}
                    </p>
                    <label className="lum-dialog-qty-label">
                      Cantidad
                      <input ref={dialogQtyRef} type="number" defaultValue={1} min={1} max={10} className="lum-dialog-qty" />
                    </label>
                    <button type="button" className="lum-btn lum-btn-primary lum-dialog-cta" onClick={handleAddToCart} >
                      Agregar al carrito
                    </button>
                  </div>
              </div>
            </article>
            </div>
          </>
        )}
      

      <Cart open={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}

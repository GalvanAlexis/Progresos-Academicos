'use client';

import { useState } from 'react';
const INGREDIENTS = [
  { name: 'Acido Hialuronico', desc: 'Hidratacion profunda y relleno de arrugas', detail: 'El acido hialuronico de triple peso molecular hidrata desde la superficie hasta las capas mas profundas de la piel, reduciendo visiblemente las lineas de expresion y aportando volumen natural.', color: '#b87676', potency: 95 },
  { name: 'Vitamina C', desc: 'Antioxidante que ilumina y unifica el tono', detail: 'La vitamina C estabilizada ilumina el cutis, reduce manchas oscuras, unifica el tono y protege contra el dano de los radicales libres y la contaminacion.', color: '#d4a84b', potency: 85 },
  { name: 'Rosa Mosqueta', desc: 'Regenera la piel y reduce cicatrices', detail: 'El aceite de rosa mosqueta es rico en acidos grasos esenciales y vitamina A, que estimulan la regeneracion celular, mejoran la textura de la piel y reducen cicatrices y marcas.', color: '#8faa7a', potency: 78 },
  { name: 'Aloe Vera', desc: 'Calma la irritacion y aporta frescura', detail: 'El aloe vera puro tiene propiedades antiinflamatorias y calmantes que alivian la irritacion, las rojeces y las quemaduras solares, mientras aporta una sensacion de frescura inmediata.', color: '#7a9e9e', potency: 70 },
  { name: 'Colageno Vegetal', desc: 'Mejora la elasticidad y firmeza', detail: 'El colageno vegetal de origen sostenible estimula la produccion natural de colageno en la piel, mejorando su elasticidad, firmeza y reduciendo la flacidez.', color: '#b87676', potency: 88 },
  { name: 'Aceite de Jojoba', desc: 'Regula la produccion de sebo natural', detail: 'El aceite de jojoba es estructuralmente similar al sebo humano, por lo que equilibra la produccion de grasa natural, hidrata sin obstruir poros y es ideal para pieles mixtas y grasas.', color: '#d4a84b', potency: 72 },
];

export default function Ingredientes() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="ingredientes" className="lum-section lum-ingredientes">
      <div className="lum-container">
        <h2 className="lum-section-title">Ingredientes que importan</h2>
        <p className="lum-section-sub">
          Cada componente fue seleccionado por su eficacia comprobada y su origen sostenible.
        </p>
        <div className="lum-ing-grid">
          {INGREDIENTS.map((ing, i) => (
            <div key={ing.name} className="lum-ing-card" >
              <button onClick={() => setSelected(ing.name)}
                className="lum-ing-btn"
              >
                <h3 className="lum-ing-name">{ing.name}</h3>
                <p className="lum-ing-desc">{ing.desc}</p>
                <div>
                  <div style={{ width: `${ing.potency}%`, height: '100%', borderRadius: 4, background: 'var(--accent)' }} />
                </div>
                <span>
                  {ing.potency}%
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      
        {selected && (
          <>
            <div key="ing-backdrop" onClick={() => setSelected(null)}
              
            />
            <div>
              {(() => {
                const ing = INGREDIENTS.find(x => x.name === selected);
                if (!ing) return null;
                return (
                  <article key="ing-modal" >
                    <button onClick={() => setSelected(null)}
                      
                    >
                      &times;
                    </button>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${ing.color}20`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
                      <span>{ing.potency}%</span>
                    </div>
                    <h3>{ing.name}</h3>
                    <div style={{ height: 4, borderRadius: 2, margin: '0 auto 16px', maxWidth: 200, background: `linear-gradient(90deg, ${ing.color}, ${ing.color}44)`, }} />
                    <p>{ing.detail}</p>
                  </article>
                );
              })()}
            </div>
          </>
        )}
      
    </section>
  );
}

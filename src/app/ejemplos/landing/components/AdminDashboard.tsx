'use client';

import { useState } from 'react';
import { useAdmin, Testimonial } from '../hooks/useAdmin';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = 'images' | 'prices' | 'testimonials';

export default function AdminDashboard({ open, onClose }: Props) {
  const { galleryImages, mainPrice, addonPrice, testimonials, update, updateImage, addTestimonial, updateTestimonial, deleteTestimonial, reset } = useAdmin();
  const [tab, setTab] = useState<Tab>('images');

  const [newTName, setNewTName] = useState('');
  const [newTText, setNewTText] = useState('');
  const [newTRating, setNewTRating] = useState(5);
  const [editTId, setEditTId] = useState<string | null>(null);

  const handleAddOrEditTestimonial = () => {
    if (!newTName.trim() || !newTText.trim()) return;
    if (editTId) {
      updateTestimonial(editTId, { name: newTName.trim(), text: newTText.trim(), rating: newTRating });
    } else {
      addTestimonial({ name: newTName.trim(), text: newTText.trim(), rating: newTRating });
    }
    setNewTName('');
    setNewTText('');
    setNewTRating(5);
    setEditTId(null);
  };

  const startEdit = (t: Testimonial) => {
    setNewTName(t.name);
    setNewTText(t.text);
    setNewTRating(t.rating);
    setEditTId(t.id);
  };

  const cancelEdit = () => {
    setNewTName('');
    setNewTText('');
    setNewTRating(5);
    setEditTId(null);
  };

  return (
    <>
      {open && (
        <>
          <div key="dash-overlay" onClick={onClose} />
          <aside key="dash-panel" >
            <div className="lum-dash-header">
              <h2 className="lum-dash-title">
                Panel de control
                <span className="lum-cart-close" onClick={onClose}>&times;</span>
              </h2>
            </div>

            <div className="lum-dash-tabs">
              {(['images', 'prices', 'testimonials'] as Tab[]).map((t) => (
                <button key={t} className={`lum-dash-tab ${tab === t ? 'lum-dash-tab-active' : ''}`} onClick={() => setTab(t)}
                >
                  {t === 'images' ? 'Imagenes' : t === 'prices' ? 'Precios' : 'Recomendados'}
                </button>
              ))}
            </div>

            <div className="lum-dash-body">
              {tab === 'images' && (
                <div className="lum-dash-section">
                  <p className="lum-dash-label">URLs de las imagenes de galeria</p>
                  {galleryImages.map((src, i) => (
                    <div key={i} className="lum-dash-field">
                      <label className="lum-dash-field-label">Imagen {i + 1}</label>
                      <input className="lum-dash-input" value={src} onChange={(e) => updateImage(i, e.target.value)}
                      />
                      <img src={src} alt="" className="lum-dash-preview" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  ))}
                </div>
              )}

              {tab === 'prices' && (
                <div className="lum-dash-section">
                  <p className="lum-dash-label">Precios del producto</p>
                  <div className="lum-dash-field">
                    <label className="lum-dash-field-label">Lumina Serum Facial ($)</label>
                    <input className="lum-dash-input" type="number" min={0} value={mainPrice} onChange={(e) => update({ mainPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div className="lum-dash-field">
                    <label className="lum-dash-field-label">Protector Solar SPF 50+ ($)</label>
                    <input className="lum-dash-input" type="number" min={0} value={addonPrice} onChange={(e) => update({ addonPrice: Number(e.target.value) })}
                    />
                  </div>
                </div>
              )}

              {tab === 'testimonials' && (
                <div className="lum-dash-section">
                  <p className="lum-dash-label">Agregar / editar recomendado</p>
                  <div className="lum-dash-field">
                    <input className="lum-dash-input" placeholder="Nombre" value={newTName} onChange={(e) => setNewTName(e.target.value)}
                    />
                  </div>
                  <div className="lum-dash-field">
                    <textarea className="lum-dash-input lum-dash-textarea" placeholder="Texto del testimonio" value={newTText} onChange={(e) => setNewTText(e.target.value)}
                    />
                  </div>
                  <div className="lum-dash-field">
                    <label className="lum-dash-field-label">Rating: {newTRating} estrella(s)</label>
                    <input className="lum-dash-input" type="range" min={1} max={5} value={newTRating} onChange={(e) => setNewTRating(Number(e.target.value))}
                    />
                  </div>
                  <div className="lum-dash-rowbtns">
                    <button className="lum-btn lum-btn-primary" onClick={handleAddOrEditTestimonial}>
                      {editTId ? 'Guardar cambios' : 'Agregar'}
                    </button>
                    {editTId && (
                      <button className="lum-btn" onClick={cancelEdit}>
                        Cancelar
                      </button>
                    )}
                  </div>

                  <div className="lum-dash-list">
                    {testimonials.map((t) => (
                      <div key={t.id} className="lum-dash-list-item">
                        <div className="lum-dash-list-info">
                          <strong>{t.name}</strong>
                          <p className="lum-dash-list-text">{t.text.slice(0, 80)}...</p>
                          <span className="lum-dash-list-rating">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
                        </div>
                        <div className="lum-dash-list-actions">
                          <button className="lum-dash-list-btn" onClick={() => startEdit(t)} title="Editar">&#9998;</button>
                          <button className="lum-dash-list-btn lum-dash-list-del" onClick={() => deleteTestimonial(t.id)} title="Eliminar">&times;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lum-dash-footer">
              <button className="lum-btn" onClick={reset}>
                Restaurar valores predeterminados
              </button>
              <button className="lum-btn lum-btn-primary" onClick={onClose}>
                Cerrar panel
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

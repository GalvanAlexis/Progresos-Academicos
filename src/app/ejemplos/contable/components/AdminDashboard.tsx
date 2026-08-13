'use client';

import { useState, useEffect } from 'react';
import { useAdmin, Miembro, ServicioItem, FAQItem, HistoriaItem } from '../hooks/useAdmin';

interface Props {
  open: boolean;
  onClose: () => void;
}

const GRANATE = '#7a1a1a';
const GRANATE_LIGHT = '#9a2a2a';
const BG_WARM = '#f5f3f0';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SEC = '#5a5550';

const TABS = [
  { key: 'Equipo', icon: 'U' },
  { key: 'Servicios', icon: 'S' },
  { key: 'FAQ', icon: '?' },
  { key: 'Historia', icon: 'T' },
  { key: 'Metricas', icon: 'M' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function AdminDashboard({ open, onClose }: Props) {
  const admin = useAdmin();
  const [tab, setTab] = useState<TabKey>('Equipo');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (!open) return;
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [open]);

  useEffect(() => {
    if (!mobile) setMobileOpen(false);
  }, [mobile]);

  const sidebarW = mobile && !mobileOpen ? 64 : 220;

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {open && (
        <div key="dash" >
          <aside>
            <div>
              {mobile && (
                <button type="button" onClick={() => setMobileOpen((o) => !o)}
                  
                >
                  {mobileOpen ? '\u2715' : '\u2630'}
                </button>
              )}
              {(!mobile || mobileOpen) && (
                <div>
                  <div>
                    M&A Estudio
                  </div>
                  <div>Panel de Admin</div>
                </div>
              )}
            </div>

            <nav>
              {TABS.map((t) => (
                <button key={t.key} type="button" onClick={() => { setTab(t.key); if (mobile) setMobileOpen(false); }}
                  
                  onMouseEnter={(e) => {
                    if (tab !== t.key) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    if (tab !== t.key) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span>
                    {t.icon}
                  </span>
                  {(!mobile || mobileOpen) && t.key}
                </button>
              ))}
            </nav>

            {(!mobile || mobileOpen) && (
              <div>
                <button type="button" onClick={admin.reset} >
                  Restaurar defaults
                </button>
                <button type="button" onClick={onClose} >
                  Volver al sitio
                </button>
              </div>
            )}
          </aside>

          <div key={tab} >
            <div>
              {tab === 'Equipo' && <EquipoTab admin={admin} />}
              {tab === 'Servicios' && <ServiciosTab admin={admin} />}
              {tab === 'FAQ' && <FAQTab admin={admin} />}
              {tab === 'Historia' && <HistoriaTab admin={admin} />}
              {tab === 'Metricas' && <MetricasTab />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* --- Section wrapper --- */
function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
      <div>
        {children}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 6,
  border: '1px solid rgba(0,0,0,0.08)', fontSize: 14, fontFamily: 'inherit',
  background: '#fff', boxSizing: 'border-box',
};

/* --- Generic CRUD List (add button at top) --- */
function CrudList<T extends { id: string }>({
  items,
  fields,
  onAdd,
  onUpdate,
  onDelete,
  newItem,
  labels,
}: {
  items: T[];
  fields: (keyof T)[];
  onAdd: (item: Omit<T, 'id'>) => void;
  onUpdate: (id: string, data: Partial<T>) => void;
  onDelete: (id: string) => void;
  newItem: Omit<T, 'id'>;
  labels: Partial<Record<keyof T, string>>;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<T, 'id'>>(newItem);

  const fieldLabel = (f: keyof T) => labels[f] ?? (f as string);

  return (
    <div>
      {adding ? (
        <div>
          {fields.map((f) => (
            <div key={String(f)}>
              <label>
                {fieldLabel(f)}
              </label>
              <input value={String((draft as any)[f] ?? '')} onChange={(e) => setDraft({ ...draft, [f]: e.target.value } as Omit<T, 'id'>)}
                
              />
            </div>
          ))}
          <div>
            <button type="button" onClick={() => { setAdding(false); setDraft(newItem); }}
              >
              Cancelar
            </button>
            <button type="button" onClick={() => { onAdd(draft); setAdding(false); setDraft(newItem); }}
              >
              Agregar
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setAdding(true)}
          >
          + Agregar nuevo
        </button>
      )}

      {items.map((item) => (
        <div key={item.id} >
          {editing === item.id ? (
            <div>
              {fields.map((f) => (
                <div key={String(f)}>
                  <label>
                    {fieldLabel(f)}
                  </label>
                  <input value={String((item as any)[f] ?? '')} onChange={(e) => onUpdate(item.id, { [f]: e.target.value } as Partial<T>)}
                    
                  />
                </div>
              ))}
              <div>
                <button type="button" onClick={() => setEditing(null)}
                  >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                {fields.map((f, i) => (
                  <span key={String(f)}>
                    {i > 0 && <span> &middot; </span>}
                    <strong>{fieldLabel(f)}:</strong> {String((item as any)[f] ?? '')}
                  </span>
                ))}
              </div>
              <div>
                <button type="button" onClick={() => setEditing(item.id)}
                  >
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(item.id)}
                  >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const chipBtn: React.CSSProperties = {
  padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)',
  background: '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
  color: TEXT_SEC,
};

/* --- Tab wrappers --- */
function EquipoTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="Equipo" desc="Miembros del estudio contable.">
      <CrudList<Miembro>
        items={admin.equipo}
        fields={['nombre', 'rol', 'bio']}
        onAdd={admin.addMiembro}
        onUpdate={admin.updateMiembro}
        onDelete={admin.deleteMiembro}
        newItem={{ nombre: '', rol: '', bio: '' }}
        labels={{ nombre: 'Nombre', rol: 'Rol', bio: 'Bio' }}
      />
    </Section>
  );
}

function ServiciosTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="Servicios" desc="Servicios que se muestran en la pagina.">
      <CrudList<ServicioItem>
        items={admin.servicios}
        fields={['titulo', 'desc', 'detalle', 'publico', 'precio']}
        onAdd={admin.addServicio}
        onUpdate={admin.updateServicio}
        onDelete={admin.deleteServicio}
        newItem={{ titulo: '', desc: '', detalle: '', publico: '', precio: '' }}
        labels={{ titulo: 'Titulo', desc: 'Descripcion', detalle: 'Detalle', publico: 'Publico', precio: 'Precio' }}
      />
    </Section>
  );
}

function FAQTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="FAQ" desc="Preguntas frecuentes.">
      <CrudList<FAQItem>
        items={admin.faq}
        fields={['q', 'a']}
        onAdd={admin.addFAQ}
        onUpdate={admin.updateFAQ}
        onDelete={admin.deleteFAQ}
        newItem={{ q: '', a: '' }}
        labels={{ q: 'Pregunta', a: 'Respuesta' }}
      />
    </Section>
  );
}

function HistoriaTab({ admin }: { admin: ReturnType<typeof useAdmin> }) {
  return (
    <Section title="Historia" desc="Eventos de la linea de tiempo.">
      <CrudList<HistoriaItem>
        items={admin.historia}
        fields={['year', 'event']}
        onAdd={admin.addHistoria}
        onUpdate={admin.updateHistoria}
        onDelete={admin.deleteHistoria}
        newItem={{ year: '', event: '' }}
        labels={{ year: 'Ano', event: 'Evento' }}
      />
    </Section>
  );
}

/* --- Metricas Tab: simulated charts --- */
const METRICS = [
  { label: 'Clientes activos', value: 350, pct: 100, color: GRANATE },
  { label: 'Declaraciones anuales', value: 2000, pct: 85, color: '#2e7d32' },
  { label: 'Tasa de retencion', value: '98%', pct: 98, color: '#1565c0' },
  { label: 'Profesionales en equipo', value: 8, pct: 40, color: '#e65100' },
];

function MetricasTab() {
  return (
    <Section title="Metricas" desc="Indicadores clave del estudio (simulados).">
      <div>
        {METRICS.map((m) => (
          <div key={m.label} >
            <div>
              {m.value}
            </div>
            <div>
              {m.label}
            </div>
            <div>
              <div style={{ width: `${m.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3>
          Distribucion de servicios
        </h3>
        <div>
          {[
            { label: 'Liquidacion de Sueldos', pct: 35 },
            { label: 'Impuestos', pct: 25 },
            { label: 'Contabilidad General', pct: 20 },
            { label: 'Monotributo', pct: 12 },
            { label: 'Sociedades', pct: 5 },
            { label: 'Auditoria', pct: 3 },
          ].map((d) => (
            <div key={d.label}>
              <div>
                <span>{d.label}</span>
                <span>{d.pct}%</span>
              </div>
              <div>
                <div style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

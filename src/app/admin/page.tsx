import { ReactNode } from 'react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-white/60 mt-1">Resumen de actividad y métricas clave.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95 border border-blue-500/50">
          Descargar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Clientes" value="42" trend="+12%" />
        <MetricCard title="Tareas Activas" value="18" trend="+3%" />
        <MetricCard title="Ingresos (Mes)" value="$1,240" trend="+8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">Cliente actualizado</p>
                  <p className="text-xs text-white/50">Hace {i} horas</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend }: { title: string, value: string, trend: string }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md shadow-xl hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 group cursor-default">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-white/60 mb-1">{title}</p>
          <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">{value}</h3>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 shadow-sm">
          {trend}
        </div>
      </div>
    </div>
  );
}

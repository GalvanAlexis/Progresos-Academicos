import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Panel de Administración | BladoPC',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex text-white selection:bg-blue-500/30">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/10 bg-[#111] flex items-center px-6 sticky top-0 z-10 shrink-0 shadow-sm shadow-black/50">
          <div className="flex-1 flex items-center">
            <button
              popoverTarget="admin-mobile-menu"
              className="p-2 md:hidden text-white/70 hover:text-white mr-4 rounded transition-colors hover:bg-white/10"
              aria-label="Abrir menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-white">Administrador</span>
              <span className="text-xs text-white/50">Sesión Activa</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400 border border-blue-500/30 shadow-inner">
              AG
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

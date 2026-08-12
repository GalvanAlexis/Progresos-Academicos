'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { 
    label: 'Dashboard', 
    href: '/admin',
    icon: <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  },
  { 
    label: 'Clientes', 
    href: '/admin/clientes',
    icon: <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  },
  { 
    label: 'Kanban', 
    href: '/admin/kanban',
    icon: <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
  },
  { 
    label: 'Landing Web', 
    href: '/admin/landing',
    icon: <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/10 bg-[#111] hidden md:flex flex-col shrink-0 sticky top-0 h-screen shadow-xl shadow-black/50 z-20">
      <div className="h-16 flex items-center px-6 border-b border-white/10 bg-[#0a0a0a]/50">
        <span className="text-xl font-black text-white tracking-tighter">
          Blado<span className="text-blue-500">PC</span>
        </span>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <span className={`transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-white/40 group-hover:text-white/70'}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 bg-[#0a0a0a]/50">
        <Link
          href="/"
          className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white/70 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver a la Web
        </Link>
      </div>
    </aside>
  );
}

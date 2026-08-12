import { getKanbanTasks } from '@/lib/actions/kanban';
import KanbanBoard from '@/components/admin/kanban/KanbanBoard';

export const metadata = {
  title: 'Kanban | Panel Admin',
};

export default async function KanbanPage() {
  const tasks = await getKanbanTasks();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Tablero de Tareas</h1>
          <p className="text-white/60 mt-1">Gestiona el progreso de los proyectos arrastrando las tarjetas.</p>
        </div>
      </div>
      
      <KanbanBoard initialTasks={tasks} />
    </div>
  );
}

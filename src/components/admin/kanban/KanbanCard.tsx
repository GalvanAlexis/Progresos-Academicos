import { Draggable } from '@hello-pangea/dnd'
import { Task } from './KanbanBoard'
import { deleteTaskAction } from '@/lib/actions/kanban'

export default function KanbanCard({ task, index }: { task: Task, index: number }) {
  const handleDelete = async () => {
    if (!confirm('¿Borrar tarea?')) return
    await deleteTaskAction(task.id)
    window.location.reload()
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-[#1a1a1a] p-5 rounded-xl border transition-all duration-200 group ${
            snapshot.isDragging 
              ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105 z-50' 
              : 'border-white/5 hover:border-white/20 shadow-lg'
          }`}
          style={provided.draggableProps.style}
        >
          <div className="flex justify-between items-start mb-3">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wider ${
              task.priority === 'ALTA' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
              task.priority === 'MEDIA' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
              'bg-blue-500/10 text-blue-400 border-blue-500/20'
            }`}>
              {task.priority}
            </span>
            <button 
              onClick={handleDelete}
              className="text-white/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1 -mt-1 -mr-1"
              title="Eliminar tarea"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
          <h4 className="text-white font-medium mb-1.5 text-sm">{task.title}</h4>
          {task.description && (
            <p className="text-white/40 text-xs line-clamp-3 leading-relaxed">{task.description}</p>
          )}
        </div>
      )}
    </Draggable>
  )
}

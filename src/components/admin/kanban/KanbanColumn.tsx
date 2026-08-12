import { Droppable } from '@hello-pangea/dnd'
import KanbanCard from './KanbanCard'
import { Task } from './KanbanBoard'

export default function KanbanColumn({ column }: { column: { id: string, title: string, tasks: Task[] } }) {
  return (
    <div className="bg-[#111] rounded-2xl border border-white/5 flex flex-col h-full min-h-[500px] shadow-xl">
      <div className="p-5 border-b border-white/5 bg-[#0a0a0a]/50 rounded-t-2xl flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
        <h3 className="font-bold text-white tracking-wide">{column.title}</h3>
        <span className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full font-bold">
          {column.tasks.length}
        </span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-white/[0.03]' : ''}`}
          >
            <div className="space-y-4">
              {column.tasks.map((task, index) => (
                <KanbanCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  )
}

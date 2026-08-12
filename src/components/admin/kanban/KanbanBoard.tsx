'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import KanbanColumn from './KanbanColumn'
import { updateTaskStatusAction, createTaskAction } from '@/lib/actions/kanban'

export type Task = {
  id: string
  title: string
  description: string
  status: string
  priority: string
}

export default function KanbanBoard({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'MEDIA' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const columns = {
    'TODO': { id: 'TODO', title: 'Por Hacer', tasks: tasks.filter(t => t.status === 'TODO') },
    'IN_PROGRESS': { id: 'IN_PROGRESS', title: 'En Progreso', tasks: tasks.filter(t => t.status === 'IN_PROGRESS') },
    'DONE': { id: 'DONE', title: 'Completado', tasks: tasks.filter(t => t.status === 'DONE') }
  }

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result
    
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const newStatus = destination.droppableId
    
    // UI Update Optimista
    setTasks(prev => prev.map(t => t.id === draggableId ? { ...t, status: newStatus } : t))

    try {
      await updateTaskStatusAction(draggableId, newStatus)
    } catch (err) {
      console.error(err)
      // Revertir si hay error
      setTasks(initialTasks)
    }
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('priority', formData.priority)
    data.append('status', 'TODO')
    
    try {
      await createTaskAction(data)
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  if (!mounted) return <div className="animate-pulse flex gap-6"><div className="w-1/3 h-96 bg-white/5 rounded-2xl"></div><div className="w-1/3 h-96 bg-white/5 rounded-2xl"></div><div className="w-1/3 h-96 bg-white/5 rounded-2xl"></div></div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all border border-blue-500/50 shadow-lg shadow-blue-500/20"
        >
          {isAdding ? '✕ Cancelar' : '+ Nueva Tarea'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddTask} className="mb-8 p-6 bg-[#111] border border-white/10 rounded-2xl animate-in fade-in slide-in-from-top-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Título *</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50" placeholder="Ej. Revisar cotización" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Prioridad</label>
              <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 appearance-none">
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Descripción</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50" rows={2} placeholder="Detalles de la tarea..." />
            </div>
          </div>
          <button type="submit" className="mt-5 px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">Guardar Tarea</button>
        </form>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {Object.values(columns).map(column => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

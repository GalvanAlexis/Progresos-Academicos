'use client'

import { useState } from 'react'
import { createClientAction, updateClientAction, deleteClientAction } from '@/lib/actions/clients'

type Client = {
  id: string
  name: string
  email: string
  phone: string
  status: string
  created_at: string
}

export default function ClientsTable({ initialClients }: { initialClients: Client[] }) {
  const [clients] = useState(initialClients)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'activo' })
  const [loading, setLoading] = useState(false)

  const handleEdit = (client: Client) => {
    setEditingId(client.id)
    setFormData({ name: client.name, email: client.email || '', phone: client.phone || '', status: client.status || 'activo' })
    setIsAdding(false)
  }

  const handleAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({ name: '', email: '', phone: '', status: 'activo' })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const data = new FormData()
    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('phone', formData.phone)
    data.append('status', formData.status)

    try {
      if (isAdding) {
        await createClientAction(data)
      } else if (editingId) {
        await updateClientAction(editingId, data)
      }
      window.location.reload()
    } catch (err) {
      console.error(err)
      alert("Error al guardar cliente")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return
    setLoading(true)
    try {
      await deleteClientAction(id)
      window.location.reload()
    } catch (err) {
      console.error(err)
      alert("Error al eliminar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]/50">
        <h2 className="text-lg font-semibold text-white">Directorio de Clientes</h2>
        {!isAdding && !editingId && (
          <button 
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors border border-blue-500/50 shadow-lg shadow-blue-500/20"
          >
            + Nuevo Cliente
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="p-6 bg-black/40 border-b border-white/10 animate-in fade-in slide-in-from-top-2">
          <h3 className="text-white font-medium mb-4">{isAdding ? 'Crear Nuevo Cliente' : 'Editar Cliente'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Nombre Completo *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm" placeholder="Ej. Juan Pérez" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm" placeholder="juan@ejemplo.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Teléfono</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm" placeholder="+54 9 11 1234-5678" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Estado</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm appearance-none">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="potencial">Potencial</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3 mt-4">
              <button disabled={loading} type="submit" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50">
                {loading ? 'Guardando...' : 'Guardar Cliente'}
              </button>
              <button disabled={loading} type="button" onClick={handleCancel} className="px-5 py-2.5 bg-white/5 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 hover:text-white transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="text-xs uppercase bg-[#0a0a0a] text-white/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider">Nombre</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Contacto</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Estado</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <p>No hay clientes registrados.</p>
                  </div>
                </td>
              </tr>
            ) : clients.map((client) => (
              <tr key={client.id} className="hover:bg-white/[0.03] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{client.name}</div>
                  <div className="text-xs text-white/30 mt-1 font-mono">ID: {client.id.slice(0,8)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-white/80">{client.email || '—'}</div>
                  <div className="text-white/40 mt-1">{client.phone || '—'}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    client.status === 'activo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                    client.status === 'potencial' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                    'bg-white/5 text-white/50 border-white/10'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(client)} className="text-blue-400 hover:text-blue-300 font-medium text-xs uppercase tracking-wider">Editar</button>
                  <button onClick={() => handleDelete(client.id)} className="text-red-400 hover:text-red-300 font-medium text-xs uppercase tracking-wider">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

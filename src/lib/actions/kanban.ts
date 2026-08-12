'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getKanbanTasks() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('kanban_tasks').select('*').order('created_at', { ascending: true })
  
  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
  return data
}

export async function createTaskAction(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string || 'TODO'
  const priority = formData.get('priority') as string || 'MEDIA'

  const { error } = await supabase.from('kanban_tasks').insert([
    { title, description, status, priority }
  ])

  if (error) throw new Error(error.message)
  revalidatePath('/admin/kanban')
}

export async function updateTaskStatusAction(id: string, newStatus: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('kanban_tasks').update({ status: newStatus }).eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/kanban')
}

export async function deleteTaskAction(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('kanban_tasks').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/kanban')
}

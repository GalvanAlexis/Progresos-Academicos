'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getClients() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }
  return data
}

export async function createClientAction(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const status = formData.get('status') as string || 'activo'

  const { error } = await supabase.from('clients').insert([
    { name, email, phone, status }
  ])

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/clientes')
}

export async function updateClientAction(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const status = formData.get('status') as string

  const { error } = await supabase.from('clients').update({
    name, email, phone, status
  }).eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/clientes')
}

export async function deleteClientAction(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('clients').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/clientes')
}

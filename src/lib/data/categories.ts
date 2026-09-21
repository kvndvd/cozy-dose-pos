import { createClient } from '@/lib/supabase/server'

export async function getActiveCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      description,
      sort_order,
      is_active
    `)
    .eq('is_active', true)
    .order('sort_order')

  if (error) {
    throw new Error(
      `Failed to load categories: ${error.message}`
    )
  }

  return data
}
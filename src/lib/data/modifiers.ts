import { createClient } from '@/lib/supabase/server'

export async function getProductModifierGroups(
  productId: string
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('product_modifier_groups')
    .select(`
      sort_order,
      modifier_groups (
        id,
        name,
        selection_type,
        is_required,
        min_selections,
        max_selections,
        is_active,
        modifiers (
          id,
          name,
          price_adjustment,
          is_available,
          sort_order
        )
      )
    `)
    .eq('product_id', productId)
    .order('sort_order')

  if (error) {
    throw new Error(
      `Failed to load product modifiers: ${error.message}`
    )
  }

  return data
}
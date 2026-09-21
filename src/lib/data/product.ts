import { createClient } from '@/lib/supabase/server'

export async function getAvailableProducts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      category_id,
      name,
      description,
      price,
      image_url,
      is_available,
      is_featured
    `)
    .eq('is_available', true)
    .order('name')

  if (error) {
    throw new Error(
      `Failed to load products: ${error.message}`
    )
  }

  return data
}

export async function getProductById(
  productId: string
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      category_id,
      name,
      description,
      price,
      image_url,
      is_available,
      is_featured
    `)
    .eq('id', productId)
    .eq('is_available', true)
    .single()

  if (error) {
    throw new Error(
      `Failed to load product: ${error.message}`
    )
  }

  return data
}
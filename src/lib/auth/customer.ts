import { createClient } from '@/lib/supabase/client'

export async function ensureCustomerSession() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return user
  }

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    throw new Error(error.message)
  }

  return data.user
}
import { createClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-stone-500">
          COZY DOSE ADMIN
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-3 text-stone-600">
          Welcome back.
        </p>
      </div>

      <div className="mt-8 rounded-xl border bg-white p-6">
        <p className="text-sm text-stone-500">
          Signed in as
        </p>

        <p className="mt-1 font-medium">
          {user?.email ?? 'Unknown'}
        </p>
      </div>
    </div>
  )
}
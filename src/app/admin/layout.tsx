import type { ReactNode } from 'react'
import AdminSidebar from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <main className="min-h-screen p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
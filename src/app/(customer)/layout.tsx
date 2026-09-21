import type { ReactNode } from 'react'
import CustomerHeader from '@/components/customer/customer-header'

export default function CustomerLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <CustomerHeader />

      <main>
        {children}
      </main>
    </div>
  )
}
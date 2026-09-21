import Link from 'next/link'
import LogoutButton from '@/app/admin/logout-button'

export default function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b p-6">
          <p className="text-xs font-medium tracking-[0.2em] text-stone-500">
            COZY DOSE
          </p>

          <h1 className="mt-1 text-xl font-semibold">
            Admin
          </h1>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <Link
            href="/admin"
            className="block rounded-lg px-4 py-3 text-sm hover:bg-stone-100"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="block rounded-lg px-4 py-3 text-sm hover:bg-stone-100"
          >
            Orders
          </Link>

          <Link
            href="/admin/products"
            className="block rounded-lg px-4 py-3 text-sm hover:bg-stone-100"
          >
            Products
          </Link>

          <Link
            href="/admin/categories"
            className="block rounded-lg px-4 py-3 text-sm hover:bg-stone-100"
          >
            Categories
          </Link>

          <Link
            href="/admin/inventory"
            className="block rounded-lg px-4 py-3 text-sm hover:bg-stone-100"
          >
            Inventory
          </Link>
        </nav>

        <div className="border-t p-4">
          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}
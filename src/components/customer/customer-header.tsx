import Link from 'next/link'

export default function CustomerHeader() {
return (
    <header className="border-b bg-stone-50">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
        href="/"
        className="text-xl font-semibold tracking-tight"
        >
        Cozy Dose
        </Link>

        <nav className="flex items-center gap-5 text-sm">
        <Link
            href="/"
            className="transition-opacity hover:opacity-60"
        >
            Menu
        </Link>

        <Link
            href="/cart"
            className="transition-opacity hover:opacity-60"
        >
            Cart
        </Link>
        </nav>
    </div>
    </header>
)
}
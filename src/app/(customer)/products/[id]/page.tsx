import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProductById } from '@/lib/data/products'
import { getProductModifierGroups } from '@/lib/data/modifiers'

import ProductCustomizer from './product-customizer'

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params

  let product

  try {
    product = await getProductById(id)
  } catch {
    notFound()
  }

  if (!product) {
    notFound()
  }

  const modifierGroups =
    await getProductModifierGroups(product.id)

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/"
        className="text-sm text-stone-500 transition-opacity hover:opacity-60"
      >
        ← Back to menu
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-stone-200">
          <div className="aspect-square">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-stone-500">
                {product.name}
              </div>
            )}
          </div>
        </div>

        <div className="lg:py-4">
          <p className="text-sm font-medium tracking-[0.2em] text-stone-500">
            COZY DOSE
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {product.name}
          </h1>

          {product.description && (
            <p className="mt-4 leading-7 text-stone-600">
              {product.description}
            </p>
          )}

          <p className="mt-5 text-xl font-semibold">
            ₱{Number(product.price).toFixed(2)}
          </p>

          <div className="mt-8">
            <ProductCustomizer
              basePrice={Number(product.price)}
              modifierGroups={modifierGroups}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
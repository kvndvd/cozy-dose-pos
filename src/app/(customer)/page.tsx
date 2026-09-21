import Link from 'next/link'

import {
  getActiveCategories,
} from '@/lib/data/categories'

import {
  getAvailableProducts,
} from '@/lib/data/products'

export default async function CustomerHomePage() {
  const [
    categories,
    products,
  ] = await Promise.all([
    getActiveCategories(),
    getAvailableProducts(),
  ])

  const featuredProducts = products.filter(
    (product) => product.is_featured
  )

  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-stone-100">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-sm font-medium tracking-[0.2em] text-stone-500">
            COZY DOSE
          </p>

          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Find your dose.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-stone-600">
            Coffee, matcha, and something cozy for
            whatever kind of dose you need today.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-0 z-10 border-b bg-stone-50/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#category-${category.id}`}
                className="whitespace-nowrap rounded-full border bg-white px-4 py-2 text-sm transition-colors hover:bg-stone-100"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div>
            <p className="text-sm font-medium tracking-wide text-stone-500">
              A LITTLE SOMETHING
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Featured doses
            </h2>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="block overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-sm"
                >
                <ProductImage
                  imageUrl={product.image_url}
                  name={product.name}
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {product.description}
                    </p>
                  )}

                  <p className="mt-4 font-medium">
                    ₱{Number(product.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Menu */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div>
          <p className="text-sm font-medium tracking-wide text-stone-500">
            THE MENU
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Your dose, your way.
          </h2>
        </div>

        <div className="mt-10 space-y-14">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) =>
                product.category_id === category.id
            )

            if (categoryProducts.length === 0) {
              return null
            }

            return (
              <section
                key={category.id}
                id={`category-${category.id}`}
                className="scroll-mt-24"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {category.name}
                  </h3>

                  {category.description && (
                    <p className="mt-1 text-sm text-stone-500">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="block overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-sm"
                      >
                      <ProductImage
                        imageUrl={product.image_url}
                        name={product.name}
                      />

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-semibold">
                            {product.name}
                          </h4>

                          <p className="shrink-0 font-medium">
                            ₱
                            {Number(
                              product.price
                            ).toFixed(2)}
                          </p>
                        </div>

                        {product.description && (
                          <p className="mt-2 text-sm leading-6 text-stone-600">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function ProductImage({
  imageUrl,
  name,
}: {
  imageUrl: string | null
  name: string
}) {
  return (
    <div className="aspect-square bg-stone-200">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-6 text-center text-sm text-stone-500">
          {name}
        </div>
      )}
    </div>
  )
}
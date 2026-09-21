'use client'

import { useMemo, useState } from 'react'

type Modifier = {
  id: string
  name: string
  price_adjustment: number
  is_available: boolean
  sort_order: number
}

type ModifierGroup = {
  id: string
  name: string
  selection_type: 'single' | 'multiple'
  is_required: boolean
  min_selections: number
  max_selections: number
  is_active: boolean
  modifiers: Modifier[]
}

type ProductModifierGroup = {
  sort_order: number
  modifier_groups:
    | ModifierGroup
    | ModifierGroup[]
    | null
}

type ProductCustomizerProps = {
  basePrice: number
  modifierGroups: ProductModifierGroup[]
}

export default function ProductCustomizer({
  basePrice,
  modifierGroups,
}: ProductCustomizerProps) {
  const [selectedModifiers, setSelectedModifiers] =
    useState<Record<string, string[]>>({})

  const [quantity, setQuantity] = useState(1)

  const groups = useMemo(() => {
    return modifierGroups
      .map((item) => {
        const group = Array.isArray(
          item.modifier_groups
        )
          ? item.modifier_groups[0]
          : item.modifier_groups

        return group
      })
      .filter(
        (group): group is ModifierGroup =>
          Boolean(group?.is_active)
      )
      .map((group) => ({
        ...group,
        modifiers: [...group.modifiers]
          .filter(
            (modifier) => modifier.is_available
          )
          .sort(
            (a, b) =>
              a.sort_order - b.sort_order
          ),
      }))
      .filter(
        (group) => group.modifiers.length > 0
      )
  }, [modifierGroups])

  const modifierTotal = groups.reduce(
    (total, group) => {
      const selected =
        selectedModifiers[group.id] ?? []

      return (
        total +
        selected.reduce(
          (groupTotal, modifierId) => {
            const modifier =
              group.modifiers.find(
                (item) =>
                  item.id === modifierId
              )

            return (
              groupTotal +
              Number(
                modifier?.price_adjustment ?? 0
              )
            )
          },
          0
        )
      )
    },
    0
  )

  const unitPrice =
    basePrice + modifierTotal

  const totalPrice =
    unitPrice * quantity

  function selectModifier(
    group: ModifierGroup,
    modifierId: string
  ) {
    setSelectedModifiers((current) => {
      const existing =
        current[group.id] ?? []

      if (
        group.selection_type ===
        'single'
      ) {
        return {
          ...current,
          [group.id]: [modifierId],
        }
      }

      const alreadySelected =
        existing.includes(modifierId)

      if (alreadySelected) {
        return {
          ...current,
          [group.id]:
            existing.filter(
              (id) =>
                id !== modifierId
            ),
        }
      }

      if (
        group.max_selections > 0 &&
        existing.length >=
          group.max_selections
      ) {
        return current
      }

      return {
        ...current,
        [group.id]: [
          ...existing,
          modifierId,
        ],
      }
    })
  }

  function isGroupValid(
    group: ModifierGroup
  ) {
    const selected =
      selectedModifiers[group.id] ?? []

    if (!group.is_required) {
      return true
    }

    return (
      selected.length >=
      group.min_selections
    )
  }

  const canAddToCart =
    groups.every(isGroupValid)

  return (
    <div>
      <div className="space-y-8">
        {groups.map((group) => {
          const selected =
            selectedModifiers[
              group.id
            ] ?? []

          return (
            <section key={group.id}>
              <div className="mb-3">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-semibold">
                    {group.name}
                  </h2>

                  <span
                    className={`text-xs ${
                      group.is_required
                        ? 'font-medium text-stone-900'
                        : 'text-stone-500'
                    }`}
                  >
                    {group.is_required
                      ? 'Required'
                      : 'Optional'}
                  </span>
                </div>

                <p className="mt-1 text-xs text-stone-500">
                  {group.selection_type ===
                    'single'
                    ? 'Choose one'
                    : group.max_selections >
                        0
                      ? `Choose up to ${group.max_selections}`
                      : 'Choose as many as you like'}
                </p>
              </div>

              <div className="space-y-2">
                {group.modifiers.map(
                  (modifier) => {
                    const checked =
                      selected.includes(
                        modifier.id
                      )

                    return (
                      <button
                        key={modifier.id}
                        type="button"
                        onClick={() =>
                          selectModifier(
                            group,
                            modifier.id
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                          checked
                            ? 'border-stone-900 bg-stone-100'
                            : 'border-stone-200 bg-white hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                              checked
                                ? 'border-stone-900 bg-stone-900 text-white'
                                : 'border-stone-300'
                            }`}
                          >
                            {checked
                              ? '✓'
                              : ''}
                          </span>

                          <span className="text-sm font-medium">
                            {modifier.name}
                          </span>
                        </div>

                        <span
                          className={`text-sm ${
                            Number(
                              modifier.price_adjustment
                            ) > 0
                              ? 'text-stone-600'
                              : 'text-stone-400'
                          }`}
                        >
                          {Number(
                            modifier.price_adjustment
                          ) > 0
                            ? `+₱${Number(
                                modifier.price_adjustment
                              ).toFixed(2)}`
                            : 'No extra charge'}
                        </span>
                      </button>
                    )
                  }
                )}
              </div>
            </section>
          )
        })}
      </div>

      <div className="mt-8 border-t pt-6">
        <div>
          <p className="text-sm font-medium">
            Quantity
          </p>

          <div className="mt-3 flex w-fit items-center rounded-xl border bg-white">
            <button
              type="button"
              onClick={() =>
                setQuantity((value) =>
                  Math.max(
                    1,
                    value - 1
                  )
                )
              }
              className="px-4 py-3 text-lg transition-colors hover:bg-stone-50"
            >
              −
            </button>

            <span className="min-w-12 text-center text-sm font-medium">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                setQuantity(
                  (value) =>
                    value + 1
                )
              }
              className="px-4 py-3 text-lg transition-colors hover:bg-stone-50"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-6">
          <div>
            <p className="text-sm text-stone-500">
              Total
            </p>

            <p className="text-2xl font-semibold">
              ₱
              {totalPrice.toFixed(
                2
              )}
            </p>
          </div>

          <button
            type="button"
            disabled={!canAddToCart}
            className="rounded-xl bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to cart
          </button>
        </div>

        {!canAddToCart && (
          <p className="mt-3 text-right text-xs text-stone-500">
            Please complete the required selections.
          </p>
        )}
      </div>
    </div>
  )
}
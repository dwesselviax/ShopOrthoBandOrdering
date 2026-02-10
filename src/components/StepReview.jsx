import { useMemo, useState } from 'react'
import { SIZES } from '../bandData'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'

export default function StepReview({ bandType, settings, quantities, onBack, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const orderLines = useMemo(() => {
    return Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([key, qty]) => {
        const withoutPrefix = key.slice(bandType.prefix.length)
        const posMatch = withoutPrefix.match(/^(Up|Lo)(R|L)?/)
        const sizeRaw = withoutPrefix.replace(/^(Up|Lo)(R|L)?/, '')

        const position = posMatch
          ? `${posMatch[1] === 'Up' ? 'Upper' : 'Lower'}${posMatch[2] === 'R' ? ' Right' : posMatch[2] === 'L' ? ' Left' : ''}`
          : ''

        const sizeEntry = SIZES.find((s) => s.value === sizeRaw)
        const sizeLabel = sizeEntry ? sizeEntry.label : sizeRaw.replace('.', ' 1/2')

        return { key, position, size: sizeLabel, quantity: qty }
      })
      .sort((a, b) => a.position.localeCompare(b.position) || a.size.localeCompare(b.size))
  }, [quantities, bandType.prefix])

  const totalBands = orderLines.reduce((sum, l) => sum + l.quantity, 0)

  async function handleAddToCart() {
    setIsAdding(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsAdding(false)
    setAdded(true)
    onAddToCart?.()
  }

  if (added) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sol-brand-green">
          <Check size={32} className="text-sol-dark-green" strokeWidth={3} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-sol-dark-green">Added to Cart</h2>
        <p className="mb-6 text-sm text-sol-dark-gray">
          {totalBands} {bandType.label} bands have been added to your cart.
        </p>
        <div className="flex gap-3">
          <a
            href="#"
            className="rounded-md border-2 border-sol-dark-green px-6 py-2.5 text-sm font-bold text-sol-dark-green transition-colors hover:bg-sol-dark-green hover:text-white"
          >
            Continue Shopping
          </a>
          <a
            href="#"
            className="rounded-md bg-sol-dark-green px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sol-dark-green/90"
          >
            View Cart
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-1 text-2xl font-bold text-sol-dark-green">Review Your Order</h2>
      <p className="mb-6 text-sm text-sol-dark-gray">
        Confirm the details below before adding to your cart.
      </p>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Band Type" value={bandType.label} />
        <SummaryCard
          label="Attachment"
          value={
            settings.prescription === 'perprescription'
              ? `Per Prescription (Rx #${settings.prescriptionNumber})`
              : 'Bands only — no attachments'
          }
        />
        <SummaryCard
          label="Settings"
          value={formatSettings(bandType, settings)}
        />
      </div>

      {/* Line items */}
      <div className="overflow-hidden rounded-lg border border-sol-gray">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sol-dark-green text-white">
              <th className="px-4 py-3 text-left font-bold">Position</th>
              <th className="px-4 py-3 text-left font-bold">Size</th>
              <th className="px-4 py-3 text-right font-bold">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderLines.map((line, idx) => (
              <tr
                key={line.key}
                className={`border-t border-sol-gray ${idx % 2 === 0 ? 'bg-white' : 'bg-sol-light-gray/50'}`}
              >
                <td className="px-4 py-2.5 text-sol-text-gray">{line.position}</td>
                <td className="px-4 py-2.5 font-medium text-sol-dark-green">{line.size}</td>
                <td className="px-4 py-2.5 text-right font-bold text-sol-dark-green">
                  {line.quantity}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-sol-dark-green bg-sol-light-teal/30">
              <td colSpan={2} className="px-4 py-3 font-bold text-sol-dark-green">
                Total Bands
              </td>
              <td className="px-4 py-3 text-right text-lg font-extrabold text-sol-dark-green">
                {totalBands}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between border-t border-sol-gray pt-6">
        <button
          onClick={onBack}
          className="rounded-md border-2 border-sol-dark-green px-6 py-2.5 text-sm font-bold text-sol-dark-green transition-colors hover:bg-sol-dark-green hover:text-white"
        >
          Back
        </button>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex items-center gap-2 rounded-md bg-sol-dark-green px-8 py-3 text-sm font-bold text-white transition-all hover:bg-sol-dark-green/90 disabled:bg-sol-medium-gray disabled:text-sol-dark-gray"
        >
          {isAdding ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-lg border border-sol-gray bg-sol-light-gray p-4">
      <span className="mb-1 block text-xs font-bold tracking-wider text-sol-teal uppercase">
        {label}
      </span>
      <span className="text-sm font-medium text-sol-dark-green">{value}</span>
    </div>
  )
}

function formatSettings(bandType, settings) {
  if (settings.prescription === 'perprescription') {
    return 'Determined by prescription'
  }
  const parts = []
  if (bandType.requiresTemper) {
    parts.push(settings.temper === 'H' ? 'Hard temper' : 'Regular temper')
  } else if (bandType.defaultTemper) {
    parts.push(bandType.defaultTemper === 'H' ? 'Hard temper (default)' : 'Regular temper (default)')
  }
  if (bandType.requiresWidth) {
    parts.push(settings.width === 'W' ? 'Wide' : 'Narrow')
  } else if (bandType.defaultWidth) {
    parts.push(bandType.defaultWidth === 'W' ? 'Wide (default)' : 'Narrow (default)')
  }
  return parts.length > 0 ? parts.join(', ') : 'No additional settings'
}

import { useState, useMemo } from 'react'
import { SIZES } from '../bandData'
import { Trash2 } from 'lucide-react'

export default function StepQuantities({ bandType, quantities, onChange, onBack, onNext }) {
  const [comment, setComment] = useState('')
  const { columns, fields, prefix } = bandType

  const totalBands = useMemo(
    () => Object.values(quantities).reduce((sum, q) => sum + (q || 0), 0),
    [quantities],
  )

  function updateQty(size, fieldKey, value) {
    const parsed = value === '' ? 0 : Math.max(0, parseInt(value, 10) || 0)
    const key = `${prefix}${fieldKey}${size}`
    onChange({ ...quantities, [key]: parsed })
  }

  function getQty(size, fieldKey) {
    const key = `${prefix}${fieldKey}${size}`
    return quantities[key] || ''
  }

  function clearAll() {
    onChange({})
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold text-sol-dark-green">Enter Quantities</h2>
          <p className="text-sm text-sol-dark-gray">
            Enter the quantity for each size and position for{' '}
            <span className="font-bold text-sol-dark-green">{bandType.label}</span>.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-sol-light-teal px-4 py-2 text-center">
            <span className="block text-xs font-medium text-sol-dark-green">Total Bands</span>
            <span className="text-xl font-extrabold text-sol-dark-green">{totalBands}</span>
          </div>
          {totalBands > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-sm text-sol-dark-gray transition-colors hover:text-red-600"
            >
              <Trash2 size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quantity grid */}
      <div className="overflow-x-auto rounded-lg border border-sol-gray">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sol-dark-green text-white">
              <th className="px-4 py-3 text-left font-bold">Size</th>
              {columns.map((col) => (
                <th key={col} className="px-3 py-3 text-center font-bold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZES.map((size, idx) => (
              <tr
                key={size.value}
                className={`border-t border-sol-gray transition-colors hover:bg-sol-light-teal/10 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-sol-light-gray/50'
                }`}
              >
                <td className="px-4 py-2 font-medium text-sol-dark-green">{size.label}</td>
                {fields.map((fieldKey) => {
                  const val = getQty(size.value, fieldKey)
                  return (
                    <td key={fieldKey} className="px-3 py-1.5 text-center">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={val}
                        onChange={(e) => updateQty(size.value, fieldKey, e.target.value)}
                        className="w-16 rounded border border-sol-gray bg-white px-2 py-1.5 text-center text-sm text-sol-text-gray transition-colors focus:border-sol-hyperlink-teal focus:ring-1 focus:ring-sol-hyperlink-teal focus:outline-none"
                        placeholder="0"
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <label className="mb-2 block text-sm font-bold text-sol-dark-green">
          Comments <span className="font-normal text-sol-dark-gray">(optional)</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add any special instructions for this order..."
          rows={3}
          className="w-full rounded-lg border border-sol-gray px-4 py-3 text-sm text-sol-text-gray placeholder:text-sol-medium-gray focus:border-sol-hyperlink-teal focus:ring-1 focus:ring-sol-hyperlink-teal focus:outline-none"
        />
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
          onClick={onNext}
          disabled={totalBands === 0}
          className="rounded-md bg-sol-dark-green px-8 py-3 text-sm font-bold text-white transition-all hover:bg-sol-dark-green/90 disabled:cursor-not-allowed disabled:bg-sol-medium-gray disabled:text-sol-dark-gray"
        >
          Review Order
        </button>
      </div>
    </div>
  )
}

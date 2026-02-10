import { BAND_TYPES } from '../bandData'
import { Check } from 'lucide-react'

export default function StepBandType({ selected, onSelect, onNext }) {
  const molars = BAND_TYPES.filter((b) => b.category === 'Molars')
  const bicuspids = BAND_TYPES.filter((b) => b.category === 'Bicuspids')

  return (
    <div>
      <h2 className="mb-1 text-2xl font-bold text-sol-dark-green">Select Band Type</h2>
      <p className="mb-6 text-sm text-sol-dark-gray">
        Choose the type of orthodontic band you wish to order.
      </p>

      {/* Molars section */}
      <h3 className="mb-3 text-xs font-bold tracking-widest text-sol-teal uppercase">
        Molars
      </h3>
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {molars.map((band) => (
          <BandCard
            key={band.id}
            band={band}
            isSelected={selected?.id === band.id}
            onSelect={() => onSelect(band)}
          />
        ))}
      </div>

      {/* Bicuspids section */}
      <h3 className="mb-3 text-xs font-bold tracking-widest text-sol-teal uppercase">
        Bicuspids
      </h3>
      <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {bicuspids.map((band) => (
          <BandCard
            key={band.id}
            band={band}
            isSelected={selected?.id === band.id}
            onSelect={() => onSelect(band)}
          />
        ))}
      </div>

      {/* Action */}
      <div className="flex items-center justify-between border-t border-sol-gray pt-6">
        <p className="text-sm text-sol-dark-gray">
          {selected ? (
            <>
              Selected: <span className="font-bold text-sol-dark-green">{selected.label}</span>
            </>
          ) : (
            'Please select a band type to continue.'
          )}
        </p>
        <button
          onClick={onNext}
          disabled={!selected}
          className="rounded-md bg-sol-dark-green px-8 py-3 text-sm font-bold text-white transition-all hover:bg-sol-dark-green/90 disabled:cursor-not-allowed disabled:bg-sol-medium-gray disabled:text-sol-dark-gray"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

function BandCard({ band, isSelected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`group relative flex w-full items-start gap-4 rounded-lg border-2 p-4 text-left transition-all ${
        isSelected
          ? 'border-sol-dark-green bg-sol-light-teal/30 shadow-sm'
          : 'border-sol-gray bg-white hover:border-sol-medium-teal hover:shadow-sm'
      }`}
    >
      {/* Radio indicator */}
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          isSelected
            ? 'border-sol-dark-green bg-sol-dark-green'
            : 'border-sol-medium-gray group-hover:border-sol-teal'
        }`}
      >
        {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <span
          className={`block text-sm font-bold leading-tight ${
            isSelected ? 'text-sol-dark-green' : 'text-sol-text-gray'
          }`}
        >
          {band.label}
        </span>
        <span className="mt-1 block text-xs text-sol-dark-gray">{band.description}</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {band.columns.map((col) => (
            <span
              key={col}
              className="rounded-full bg-sol-light-gray px-2 py-0.5 text-[10px] font-medium text-sol-dark-gray"
            >
              {col}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

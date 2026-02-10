import { Check } from 'lucide-react'

const STEPS = [
  { label: 'Band Type', shortLabel: 'Type' },
  { label: 'Settings', shortLabel: 'Settings' },
  { label: 'Quantities', shortLabel: 'Qty' },
  { label: 'Review', shortLabel: 'Review' },
]

export default function Stepper({ currentStep }) {
  return (
    <nav aria-label="Order progress" className="mb-8">
      <ol className="flex items-center">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStep
          const isCurrent = idx === currentStep
          const isLast = idx === STEPS.length - 1

          return (
            <li key={step.label} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
              {/* Step circle + label */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-sol-brand-green text-sol-dark-green'
                      : isCurrent
                        ? 'bg-sol-dark-green text-white ring-4 ring-sol-light-teal'
                        : 'bg-sol-gray text-sol-dark-gray'
                  }`}
                >
                  {isCompleted ? <Check size={18} strokeWidth={3} /> : idx + 1}
                </div>
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    isCompleted
                      ? 'text-sol-dark-green'
                      : isCurrent
                        ? 'text-sol-dark-green font-bold'
                        : 'text-sol-dark-gray'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`mx-4 h-0.5 flex-1 rounded transition-colors ${
                    isCompleted ? 'bg-sol-brand-green' : 'bg-sol-gray'
                  }`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

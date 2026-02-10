import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Stepper from './components/Stepper'
import StepBandType from './components/StepBandType'
import StepSettings from './components/StepSettings'
import StepQuantities from './components/StepQuantities'
import StepReview from './components/StepReview'
import { ChevronRight, Home } from 'lucide-react'

export default function App() {
  const [step, setStep] = useState(0)
  const [bandType, setBandType] = useState(null)
  const [settings, setSettings] = useState({ prescription: 'plainband' })
  const [quantities, setQuantities] = useState({})

  function goTo(s) {
    setStep(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBandTypeSelect(bt) {
    if (bt.id !== bandType?.id) {
      setQuantities({})
      setSettings({ prescription: 'plainband' })
    }
    setBandType(bt)
  }

  return (
    <div className="flex min-h-screen flex-col font-solve">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-sol-gray bg-sol-light-gray">
          <nav className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-sm">
            <a
              href="#"
              className="flex items-center gap-1 text-sol-hyperlink-teal transition-colors hover:underline"
            >
              <Home size={14} />
              Home
            </a>
            <ChevronRight size={14} className="text-sol-medium-gray" />
            <span className="font-medium text-sol-dark-green">Order Bands</span>
          </nav>
        </div>

        {/* Content area */}
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Stepper currentStep={step} />

          {step === 0 && (
            <StepBandType
              selected={bandType}
              onSelect={handleBandTypeSelect}
              onNext={() => goTo(1)}
            />
          )}

          {step === 1 && bandType && (
            <StepSettings
              bandType={bandType}
              settings={settings}
              onChange={setSettings}
              onBack={() => goTo(0)}
              onNext={() => goTo(2)}
            />
          )}

          {step === 2 && bandType && (
            <StepQuantities
              bandType={bandType}
              quantities={quantities}
              onChange={setQuantities}
              onBack={() => goTo(1)}
              onNext={() => goTo(3)}
            />
          )}

          {step === 3 && bandType && (
            <StepReview
              bandType={bandType}
              settings={settings}
              quantities={quantities}
              onBack={() => goTo(2)}
              onAddToCart={() => {
                /* mock — stays on success screen */
              }}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

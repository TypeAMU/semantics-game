import { useState, lazy, Suspense } from 'react'
import Semantics from './Semantics'

const PuzzleResearcher = lazy(() => import('./tools/PuzzleResearcher'))

export default function App() {
  const [showResearcher, setShowResearcher] = useState(false)

  if (import.meta.env.DEV && showResearcher) {
    return (
      <div style={{ minHeight: '100vh', background: '#1c1914' }}>
        <button
          onClick={() => setShowResearcher(false)}
          style={{
            position: 'fixed', top: 10, right: 10, zIndex: 999,
            padding: '6px 14px', borderRadius: 6,
            background: 'rgba(184,142,74,.15)',
            border: '1px solid rgba(184,142,74,.3)',
            color: '#cbb87a', fontSize: 12, cursor: 'pointer',
            fontFamily: "'Lora', serif",
          }}
        >
          Back to Game
        </button>
        <Suspense fallback={<div style={{ color: '#8a7d60', padding: 40, textAlign: 'center' }}>Loading...</div>}>
          <PuzzleResearcher />
        </Suspense>
      </div>
    )
  }

  return (
    <>
      {import.meta.env.DEV && (
        <button
          onClick={() => setShowResearcher(true)}
          style={{
            position: 'fixed', bottom: 10, right: 10, zIndex: 999,
            padding: '6px 14px', borderRadius: 6,
            background: 'rgba(184,142,74,.15)',
            border: '1px solid rgba(184,142,74,.3)',
            color: '#cbb87a', fontSize: 11, cursor: 'pointer',
            fontFamily: "'Lora', serif",
          }}
        >
          Puzzle Researcher
        </button>
      )}
      <Semantics />
    </>
  )
}

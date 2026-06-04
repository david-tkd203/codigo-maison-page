import { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ValueProposition from './components/ValueProposition'
import Expertise from './components/Expertise'
import Solutions from './components/Solutions'
import Pricing from './components/Pricing'
import CookieConsent from './components/CookieConsent'
import useVisitorTracking from './hooks/useVisitorTracking'
import Footer from './components/Footer'

const Methodology = lazy(() => import('./components/Methodology'))
const Contact = lazy(() => import('./components/Contact'))

const THEME_KEY = 'cm-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [consentGiven, setConsentGiven] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleConsent = useCallback((accepted) => {
    setConsentGiven(accepted)
  }, [])

  // Activar tracking solo si se aceptaron las cookies
  useVisitorTracking(consentGiven === true, window.location.pathname)

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Pricing />
        <Hero />
        <ValueProposition />
        <Expertise />
        <Solutions />
        <Suspense fallback={<div className="min-h-100" />}>
          <Methodology />
        </Suspense>
        <Suspense fallback={<div className="min-h-100" />}>
          <Contact consentGiven={consentGiven === true} />
        </Suspense>
      </main>
      <CookieConsent onAccept={handleConsent} />
      <Footer />
    </>
  )
}

export default App

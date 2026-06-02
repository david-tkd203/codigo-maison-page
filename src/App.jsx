import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ValueProposition from './components/ValueProposition'
import Expertise from './components/Expertise'
import Solutions from './components/Solutions'
import Products from './components/Products'
import Pricing from './components/Pricing'
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

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <ValueProposition />
        <Expertise />
        <Solutions />
        <Products />
        <Pricing />
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <Methodology />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App

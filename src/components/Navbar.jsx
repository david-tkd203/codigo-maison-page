import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Diferencial', href: '#value-prop' },
  { label: 'Experticia', href: '#expertise' },
  { label: 'Soluciones', href: '#solutions' },
  { label: 'Metodología', href: '#methodology' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar({ theme = 'light', onToggleTheme = () => {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-0 py-4 transition-all duration-[350ms]${scrolled ? ' bg-surface/92 backdrop-blur-[16px] shadow-[0_1px_24px_rgba(7,43,58,0.08)]' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/images/codigo_maison_logo_sin_fondo.png"
            alt="Código Maison"
            className="h-9 w-auto"
            loading="eager"
          />
          <span className="font-display text-[1.1rem] font-bold text-oil tracking-[-0.02em]">Código Maison</span>
        </a>

        <div className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}
              className="font-body text-[0.85rem] font-medium tracking-[0.3px] relative text-oil/80 transition-colors duration-300 hover:text-electric after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-electric after:transition-all after:duration-300 after:w-0 hover:after:w-full">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 px-4 py-2 text-[0.78rem] font-semibold text-text transition-all duration-300 hover:border-electric/40 hover:shadow-[0_0_18px_rgba(0,207,255,0.18)]"
          >
            {isDark ? 'Modo claro' : 'Modo oscuro'}
            {isDark ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-electric" fill="none" strokeWidth="1.8">
                <path d="M12 3v2" /><path d="M12 19v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" />
                <path d="M3 12h2" /><path d="M19 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" />
                <circle cx="12" cy="12" r="4.2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-electric" fill="none" strokeWidth="1.8">
                <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <a href="#contact" onClick={closeMenu}
            className="bg-electric text-oil px-6 py-2 rounded-sm font-bold text-[0.85rem] transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,207,255,0.3)] hover:-translate-y-0.5">
            Iniciar Proyecto
          </a>
        </div>

        <button
          type="button"
          className="flex md:hidden flex-col gap-1 cursor-pointer bg-transparent border-none p-1 z-[1002]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-electric rounded-sm transition-all duration-300${open ? ' rotate-45 translate-x-[5px] translate-y-[5px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-electric rounded-sm transition-all duration-300${open ? ' opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-electric rounded-sm transition-all duration-300${open ? ' -rotate-45 translate-x-[5px] -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-oil/40 z-[999]"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed top-0 right-0 w-80 h-screen bg-oil flex-col pt-24 px-9 gap-6 shadow-[-10px_0_40px_rgba(0,0,0,0.25)] z-[1001] md:hidden flex"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={closeMenu}
                className="text-white/90 text-base transition-colors duration-300 hover:text-electric">
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-pressed={isDark}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-electric/30 bg-white/10 px-4 py-2 text-[0.82rem] font-semibold text-white/90 transition-all duration-300 hover:border-electric hover:text-electric"
            >
              {isDark ? 'Modo claro' : 'Modo oscuro'}
              {isDark ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-electric" fill="none" strokeWidth="1.8">
                  <path d="M12 3v2" /><path d="M12 19v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" />
                  <path d="M3 12h2" /><path d="M19 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" />
                  <circle cx="12" cy="12" r="4.2" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-electric" fill="none" strokeWidth="1.8">
                  <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              )}
            </button>
            <a href="#contact" onClick={closeMenu}
              className="bg-electric text-oil px-6 py-2 rounded-sm font-bold text-[0.85rem] transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,207,255,0.3)] hover:-translate-y-0.5 text-center inline-block mt-2">
              Iniciar Proyecto
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

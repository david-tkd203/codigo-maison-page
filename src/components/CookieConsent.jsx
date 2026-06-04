import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const COOKIE_KEY = 'cm-cookies-accepted';

export default function CookieConsent({ onAccept }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(COOKIE_KEY);
    if (stored === 'true') {
      onAccept(true);
    } else if (stored === 'false') {
      onAccept(false);
    } else {
      // Mostrar después de un breve delay
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [onAccept]);

  const accept = () => {
    window.localStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
    onAccept(true);
  };

  const decline = () => {
    window.localStorage.setItem(COOKIE_KEY, 'false');
    setVisible(false);
    onAccept(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-6 left-4 right-4 z-[9999] max-w-lg mx-auto"
        >
          <div className="bg-oil border border-electric/20 rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            <div className="flex items-start gap-3 mb-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-electric fill-none stroke-[1.5] flex-shrink-0 mt-0.5">
                <path d="M12 2a10 10 0 1 0 10 10h-4a6 6 0 0 1-6-6V2z" />
                <path d="M12 2v4a4 4 0 0 0 4 4h4" />
              </svg>
              <div>
                <h3 className="font-display text-[0.95rem] font-bold text-white mb-1">
                  Uso de cookies
                </h3>
                <p className="text-[0.8rem] text-white/60 leading-[1.5]">
                  Este sitio utiliza cookies para mejorar su experiencia y analizar el tráfico. 
                  Puede aceptarlas o rechazarlas. No se comparten datos personales con terceros.
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={decline}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 text-[0.8rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                Rechazar
              </button>
              <button
                onClick={accept}
                className="px-5 py-2.5 rounded-xl bg-electric text-oil text-[0.8rem] font-bold cursor-pointer transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,207,255,0.3)]"
              >
                Aceptar cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

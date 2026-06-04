import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

/* ─── SVG Brand Mark ─── */
function BrandMark({ tier }) {
  const colors = {
    plus: { hex: '#00CFFF', label: 'PLUS' },
    pro: { hex: '#6FFBFF', label: 'PRO' },
    partner: { hex: '#00CFFF', label: 'PRT' },
  };
  const c = colors[tier] || colors.plus;

  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
      {/* Hexágono exterior */}
      <defs>
        <linearGradient id={`grad-${tier}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.hex} stopOpacity="0.3" />
          <stop offset="100%" stopColor={c.hex} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <polygon
        points="24 3 44 13.5 44 34.5 24 45 4 34.5 4 13.5"
        fill={`url(#grad-${tier})`}
        stroke={c.hex}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      {/* Líneas internas decorativas */}
      <polygon
        points="24 8 39 16 39 32 24 40 9 32 9 16"
        stroke={c.hex}
        strokeWidth="0.5"
        strokeOpacity="0.2"
      />
      {/* Círculo central */}
      <circle cx="24" cy="24" r="8" stroke={c.hex} strokeWidth="1" strokeOpacity="0.7" fill={c.hex} fillOpacity="0.1" />
      {/* Texto "CM" */}
      <text x="24" y="27" textAnchor="middle" fill={c.hex} fontSize="11" fontWeight="900" fontFamily="'Orbitron',monospace" letterSpacing="1">
        CM
      </text>
    </svg>
  );
}

/* ─── "+IVA" Badge ─── */
function IVABadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-electric/10 text-electric font-tech text-[0.55rem] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-sm border border-electric/20 ml-2">
      + IVA
    </span>
  );
}

const highlights = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 3v18" />
      </svg>
    ),
    title: 'Carta Digital QR', desc: 'El menú se actualiza al instante, sin impresión y sin límites de modificaciones.' },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    title: 'Delivery, Local y Take Away', desc: 'Todos los canales de pedido centralizados en una única plataforma.' },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" />
      </svg>
    ),
    title: 'Dashboard en Tiempo Real', desc: 'Ventas, productos más vendidos y rendimiento diario al instante.' },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'Inventario con Alertas', desc: 'Stock crítico, mermas y órdenes a proveedores de forma automatizada.' },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: 'WhatsApp Integrado', desc: 'Confirmaciones, demoras y notificaciones al cliente mediante mensajería automatizada.' },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
    title: 'App iOS y Android', desc: 'Aplicación propia con pedidos, reservas y programa de fidelización incluido.' },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: 'Promociones y Cupones', desc: 'Descuentos, combos y campañas promocionales configurables en segundos.' },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: 'Redes Sociales y Pagos', desc: 'Integración con Instagram, Facebook y pasarela de pagos online integrada.' },
];

const plans = [
  {
    tier: 'plus',
    title: 'Plan Plus',
    priceMonthly: '6 UF',
    priceAnnual: '4 UF',
    badge: null,
    subtitle: 'Digitalización y gestión básica',
    features: [
      'Operación digital del restaurante:',
      '— Carta digital para clientes',
      '— Sistema de pedidos en el local',
      '— Sistema de pedidos por delivery',
      'Administración y Control:',
      '— Panel de administración',
      '— Gestión de pedidos en tiempo real',
      '— Panel básico de control',
      'Comunicación:',
      '— Integración con WhatsApp',
      '— Envío de notificaciones automáticas',
      'Infraestructura y Soporte:',
      '— Servicio de hosting y base de datos',
      '— Seguridad de la información',
      '— Actualizaciones del sistema',
      '— Soporte técnico',
    ],
  },
  {
    tier: 'pro',
    title: 'Plan Pro',
    priceMonthly: '10 UF',
    priceAnnual: '8 UF',
    badge: 'Recomendado',
    subtitle: 'Gestión avanzada y expansión digital',
    features: [
      'Todo lo incluido en el Plan Plus, más:',
      'Gestión Avanzada:',
      '— Gestión e historial de inventario con alertas',
      '— Reportes avanzados de ventas',
      'Crecimiento del Negocio:',
      '— Sistema de promociones y descuentos',
      '— Programa de fidelización de clientes',
      '— Cupones y campañas',
      'Expansión Digital:',
      '— Sistema de reservas',
      '— Integración con redes sociales',
      '— Pasarela de pagos online',
      'Tecnología Avanzada:',
      '— App móvil propia (iOS y Android)',
      '— Automatización de procesos',
      '— Diseño personalizado',
      '— Respaldo de información en la nube',
    ],
  },
  {
    tier: 'partner',
    title: 'Plan Partner',
    price: 'A cotizar',
    period: 'Solución a medida',
    badge: null,
    subtitle: 'Desarrollo personalizado',
    features: [
      'Soluciones tecnológicas creadas específicamente para la operación interna de cada negocio',
      'Un sistema diseñado a la medida del modelo de negocio particular de cada organización',
    ],
  },
];

export default function Pricing() {
  const animProps = useAccessibleAnimation();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Portal reveal on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setRevealed(true); observer.unobserve(entry.target); }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.muted = false;
      video.play();
      setPlaying(true);
    }
  };

  return (
    <section className="bg-bg relative" id="pricing">

      <div className="pt-24"></div>

      {/* ════════════════════════════════════════
          HIGHLIGHTS + VIDEO
          ════════════════════════════════════════ */}
      <div className="py-20" ref={sectionRef}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Todo en Uno</span>
            <h2 className="section-title">8 Funcionalidades para la Gestión Gastronómica</h2>
            <p className="section-subtitle mx-auto">Cada área de la operación se gestiona desde una única plataforma, sin sistemas dispersos ni integraciones costosas.</p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_0.9fr] gap-10 items-start">

            {/* ─── Left: 8 Features ─── */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <motion.div key={h.title}
                  className="bg-surface rounded-xl border border-border-soft p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-electric/30 card-glow"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <span className="w-9 h-9 bg-electric/8 rounded-xl flex items-center justify-center mb-3 text-electric">{h.icon}</span>
                  <h3 className="font-display text-[0.9rem] font-bold text-oil mb-1">{h.title}</h3>
                  <p className="text-[0.75rem] text-text-light leading-[1.5]">{h.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* ─── Right: Video con Glitch Opener ─── */}
            <div className="lg:sticky lg:top-28">
              <div className="relative max-w-[420px] mx-auto lg:max-w-none group/video">

                {/* Glow exterior */}
                <div className={`absolute -inset-4 rounded-3xl bg-electric/[0.05] blur-3xl -z-10 transition-all duration-[2s] ${revealed ? 'opacity-100' : 'opacity-0'}`} />

                {/* Contenedor con borde neon glitch */}
                <div className="relative overflow-hidden rounded-2xl video-glitch-border">

                  {/* Video */}
                  <video
                    ref={videoRef}
                    className={`w-full h-auto block ${revealed ? 'opacity-100' : 'opacity-0'}`}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/images/poster-promo.jpg"
                  >
                    <source src="/video/video_promocion.mp4" type="video/mp4" />
                  </video>

                  {/* ─── GLITCH OVERLAY (visible antes de reproducir) ─── */}
                  <button
                    onClick={handlePlay}
                    disabled={playing}
                    className={`absolute inset-0 z-20 w-full h-full cursor-pointer border-none bg-oil/90 transition-all duration-700 ${
                      playing
                        ? 'opacity-0 pointer-events-none'
                        : 'opacity-100'
                    } ${revealed ? '' : 'opacity-0 pointer-events-none'}`}
                    aria-label="Reproducir video"
                  >
                    {/* Scanlines */}
                    <div className="absolute inset-0 pointer-events-none scanlines" />

                    {/* Static noise */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] static-noise" />

                    {/* Glitch text lines */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {/* Línea superior glitch */}
                      <span className="glitch-text font-tech text-[0.55rem] tracking-[4px] text-electric/60 uppercase mb-6" data-text="// SISTEMA_INICIADO">
                        // SISTEMA_INICIADO
                      </span>

                      {/* Logo Código Maison glitch */}
                      <div className="relative mb-6">
                        <span className="glitch-main font-display text-[2rem] md:text-[2.6rem] font-black text-white leading-none tracking-[-0.04em] block glitch-r" data-text="CÓDIGO">
                          CÓDIGO
                        </span>
                        <span className="glitch-main font-display text-[2rem] md:text-[2.6rem] font-black text-white leading-none tracking-[-0.04em] block glitch-g" data-text="MAISON">
                          MAISON
                        </span>
                      </div>

                      {/* Línea separadora glitch */}
                      <div className="w-24 h-[1px] bg-electric/50 mb-5 relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-electric animate-[glitchBar_1.8s_ease-in-out_infinite]" />
                      </div>

                      {/* Línea inferior */}
                      <span className="glitch-text font-tech text-[0.5rem] tracking-[5px] text-electric/40 uppercase mb-8" data-text="// PRESENTA">
                        // PRESENTA
                      </span>

                      {/* Play prompt */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="w-12 h-12 rounded-full bg-electric/20 border border-electric/50 flex items-center justify-center transition-all duration-300 group-hover/video:bg-electric/30 group-hover/video:shadow-[0_0_30px_rgba(0,207,255,0.3)]">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-electric ml-0.5">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                        </span>
                        <span className="font-tech text-[0.6rem] tracking-[3px] text-white/50 blink-text">
                          CLICK PARA INICIAR
                        </span>
                      </div>
                    </div>

                    {/* RGB split borders (glitch offsets) */}
                    <div className="absolute inset-0 border-[2px] border-electric/20 pointer-events-none glitch-border-line" />
                    <div className="absolute inset-0 border-[2px] border-cyan-400/10 pointer-events-none translate-x-[2px] translate-y-[1px] glitch-border-line-delayed" />
                  </button>

                  {/* ─── Controles de video (después de iniciar) ─── */}
                  <button
                    onClick={handlePlay}
                    className={`absolute bottom-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-oil/60 backdrop-blur-sm border border-white/15 transition-all duration-300 hover:bg-oil/80 hover:border-electric/40 cursor-pointer ${
                      playing ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    aria-label="Pausar"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                    </svg>
                  </button>
                </div>

                {/* Label corporativo */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-[0.7rem] text-text-light/60 mt-3 tracking-[2px] font-tech uppercase"
                >
                  Código Maison © 2026 · Video Corporativo
                </motion.p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          PRECIOS
          ════════════════════════════════════════ */}
      <div className="pb-24" id="planes">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Planes y Presupuestos</span>
            <h2 className="section-title">El Plan que Impulsa su Restaurante</h2>
            <p className="section-subtitle mx-auto mb-8">
              Desde la digitalización básica hasta una solución completa a medida. Todos los planes incluyen instalación y capacitación.
            </p>
          </motion.div>

          {/* Instalación Base */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-surface border border-electric/20 rounded-xl p-6 mb-12 max-w-3xl mx-auto text-left relative overflow-hidden">
            {/* Línea decorativa superior */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-electric/0 via-electric to-electric/0" />
            <h3 className="font-display text-[1rem] font-bold text-oil mb-2">
              <span className="inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-electric">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" />
                </svg>
                Costo de Instalación Base
              </span>
            </h3>
            <p className="text-[0.85rem] text-electric font-semibold mb-1">Aplica a Plan Plus y Plan Pro</p>
            <p className="text-[0.95rem] text-electric font-semibold mb-2">
              5 UF <IVABadge /> <span className="text-text-light font-normal">por local</span>
              <span className="text-text-light font-normal"> (pago único)</span>
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start max-w-[400px] md:max-w-none mx-auto"
            variants={containerVariants}
            {...animProps}
          >
            {plans.map((plan) => {
              const isPro = plan.tier === 'pro';
              const isPartner = plan.tier === 'partner';

              return (
                <motion.div
                  key={plan.title}
                  variants={itemVariants}
                  className={`rounded-xl border p-0 transition-all duration-[400ms] card-glow pointer-track relative overflow-hidden ${
                    isPro
                      ? 'bg-surface border-electric/30 shadow-glow md:scale-[1.03]'
                      : 'bg-surface border-border-soft hover:shadow-lg hover:-translate-y-1.5'
                  }`}
                >
                  {/* ─── Borde gradiente superior ─── */}
                  <div className={`h-[3px] w-full bg-gradient-to-r ${
                    isPro
                      ? 'from-electric via-cyan-glow to-electric'
                      : 'from-electric/40 via-electric/80 to-electric/40'
                  }`} />

                  {/* ─── Header con Brand Mark ─── */}
                  <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                    <BrandMark tier={plan.tier} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display text-[1.15rem] font-bold text-oil">{plan.title}</h3>
                        {plan.badge && (
                          <span className="inline-block bg-electric text-oil font-tech text-[0.55rem] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 rounded-full">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      {plan.subtitle && (
                        <p className="text-[0.75rem] text-electric font-semibold mt-0.5">{plan.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {/* ─── Precios ─── */}
                  {plan.priceMonthly && plan.priceAnnual ? (
                    <div className="px-7 pb-5 border-b border-border">
                      {/* Mensual */}
                      <div className="mb-2">
                        <span className="text-[0.65rem] text-text-light font-tech tracking-[1px] uppercase">Plan Mensual</span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="font-display text-[2rem] font-extrabold text-oil leading-none">{plan.priceMonthly}</span>
                          <IVABadge />
                          <span className="text-[0.8rem] text-text-light ml-1">/mes</span>
                        </div>
                      </div>
                      {/* Anual */}
                      <div>
                        <span className="text-[0.65rem] text-text-light font-tech tracking-[1px] uppercase">Plan Anual</span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="font-display text-[1.4rem] font-extrabold text-electric leading-none">{plan.priceAnnual}</span>
                          <IVABadge />
                          <span className="text-[0.8rem] text-text-light ml-1">/mes</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="px-7 pb-5 border-b border-border">
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-display text-[2rem] font-extrabold text-oil leading-none">{plan.price}</span>
                        <span className="text-[0.8rem] text-electric font-semibold">— {plan.period}</span>
                      </div>
                      <p className="text-[0.7rem] text-text-light mt-1">Presupuesto personalizado según requerimientos</p>
                    </div>
                  )}

                  {/* ─── Features ─── */}
                  <ul className="px-7 py-5 space-y-0.5">
                    {plan.features.map((f) => (
                      <li key={f} className="text-[0.8rem] text-text-light py-1.5 border-b border-oil/4 last:border-none last:font-bold last:text-oil leading-[1.5]">
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* ─── CTA ─── */}
                  <div className="px-7 pb-7">
                    <a
                      href="#contact"
                      className={`block text-center font-bold text-[0.85rem] px-6 py-3 rounded-sm transition-all duration-300 ${
                        isPro
                          ? 'bg-electric text-oil hover:shadow-[0_0_24px_rgba(0,207,255,0.3)]'
                          : 'bg-oil text-electric border border-electric/20 hover:bg-electric hover:text-oil'
                      } hover:-translate-y-0.5`}
                    >
                      {isPartner ? 'Conversemos' : 'Solicitar Presupuesto'}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

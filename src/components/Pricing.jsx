import { motion } from 'motion/react';
import { containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

const stats = [
  { val: '48 hrs', label: 'implementación' },
  { val: '100%', label: 'en la nube' },
  { val: '24/7', label: 'soporte' },
  { val: '1', label: 'plataforma única' },
];

const highlights = [
  { icon: '📱', title: 'Carta Digital QR', desc: 'Actualizá tu menú al instante. Sin imprimir. Sin límites.' },
  { icon: '🛵', title: 'Delivery + Local + Take Away', desc: 'Centralizá todos los canales de pedido en una pantalla.' },
  { icon: '📊', title: 'Dashboard Tiempo Real', desc: 'Ventas, productos top, rendimiento del día al instante.' },
  { icon: '📦', title: 'Inventario con Alertas', desc: 'Stock crítico, mermas y órdenes a proveedores automatizadas.' },
  { icon: '💬', title: 'WhatsApp Integrado', desc: 'Confirmaciones, demoras y notificaciones al cliente vía WA.' },
  { icon: '📲', title: 'App iOS + Android', desc: 'Tu propia app con pedidos, reservas y programa de fidelización.' },
  { icon: '🎯', title: 'Promociones y Cupones', desc: 'Creá descuentos, combos y campañas en segundos.' },
  { icon: '🔗', title: 'Redes Sociales + Pagos', desc: 'Integración con Instagram, Facebook y pasarela de pagos online.' },
];

const plans = [
  {
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
    title: 'Plan Partner',
    price: 'A cotizar',
    period: 'Solución a medida',
    badge: null,
    subtitle: 'Desarrollo personalizado',
    features: [
      'Diseñamos y desarrollamos soluciones tecnológicas creadas específicamente para la operación interna de tu negocio',
      'Un sistema hecho a la medida de tu modelo de negocio particular',
    ],
  },
];

export default function Pricing() {
  const animProps = useAccessibleAnimation();

  return (
    <section className="bg-bg relative" id="pricing">

      {/* ════════════════════════════════════════
          HERO DE PRODUCTO
          ════════════════════════════════════════ */}
      <div className="relative overflow-hidden pb-10 pt-28">
        <div className="hero-grid opacity-30" />
        <div className="hero-orb hero-orb-a" style={{ opacity: 0.15 }} />
        <div className="hero-orb hero-orb-b" style={{ opacity: 0.1 }} />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-[2]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2.5 bg-surface/90 border border-electric/28 rounded-full px-5 py-2.5 font-tech text-[0.7rem] text-oil tracking-widest uppercase mb-6 shadow-[0_14px_42px_rgba(0,207,255,0.12)]">
            <span className="badge-dot" />
            Restorant System — Lanzamiento 2026
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.8rem,6.5vw,6.5rem)] font-black leading-[0.9] tracking-[-0.07em] text-oil mb-4">
            El Sistema Operativo<br />
            de tu <span className="text-electric">Restaurante</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-[clamp(1rem,1.25vw,1.1rem)] text-oil/70 leading-[1.8] max-w-[620px] mx-auto mb-8">
            Digitalizá cada aspecto de tu operación gastronómica en una sola plataforma.
            Carta digital, pedidos, inventario, WhatsApp, app móvil, promociones y más.
            Todo sincronizado en tiempo real.
          </motion.p>

          {/* ─── Stats ─── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex justify-center gap-8 md:gap-12 mb-10 flex-wrap">
            {stats.map((s) => (
              <div key={s.val}>
                <div className="font-display text-[2rem] font-black text-electric">{s.val}</div>
                <div className="font-tech text-[0.65rem] text-oil/50 tracking-[1.5px] uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ─── CTAs ─── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex gap-4 flex-wrap justify-center mb-10">
            <a href="#contact"
              className="inline-flex items-center gap-2.5 bg-gradient-to-br from-electric to-cyan-glow text-oil font-extrabold text-[0.94rem] px-8 py-4 rounded-2xl shadow-[0_18px_42px_rgba(0,207,255,0.22)] border border-electric/70 transition-all duration-300 hover:shadow-[0_22px_54px_rgba(0,207,255,0.28)] hover:-translate-y-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Solicitar Demo Gratis
            </a>
            <a href="#planes"
              className="inline-flex items-center gap-2.5 bg-surface/85 text-oil font-extrabold text-[0.94rem] px-7 py-4 rounded-2xl border border-oil/14 shadow-[0_14px_34px_rgba(7,43,58,0.08)] transition-all duration-300 hover:border-electric/58 hover:shadow-[0_18px_44px_rgba(0,207,255,0.14)] hover:-translate-y-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42"/>
              </svg>
              Ver Planes
            </a>
          </motion.div>

          {/* ─── Redes / Contacto directo ─── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 text-[0.8rem] text-oil/50 flex-wrap">
            <a href="mailto:contact@codigomaison.com" className="flex items-center gap-1.5 hover:text-electric transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              contact@codigomaison.com
            </a>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Santiago, Chile
            </span>
            <a href="#" className="flex items-center gap-1.5 hover:text-electric transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 4L15.5 19.5L11 10L2 6L21 4Z"/><path d="M15.5 19.5L20 22L22 4"/>
              </svg>
              @codigomaison
            </a>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          HIGHLIGHTS
          ════════════════════════════════════════ */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Todo en Uno</span>
            <h2 className="section-title">8 Funcionalidades que Transforman tu Restaurante</h2>
            <p className="section-subtitle mx-auto">Gestioná cada área de tu operación sin múltiples sistemas ni integraciones costosas.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {highlights.map((h, i) => (
              <motion.div key={h.title}
                className="bg-surface rounded-xl border border-border-soft p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-electric/30 card-glow"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <span className="text-2xl mb-2.5 block">{h.icon}</span>
                <h3 className="font-display text-[0.95rem] font-bold text-oil mb-1.5">{h.title}</h3>
                <p className="text-[0.8rem] text-text-light leading-[1.5]">{h.desc}</p>
              </motion.div>
            ))}
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
            <h2 className="section-title">Elegí el Plan que Impulse tu Restaurante</h2>
            <p className="section-subtitle mx-auto mb-8">
              Desde la digitalización básica hasta una solución completa a medida. Todos incluyen instalación y capacitación.
            </p>
          </motion.div>

          {/* Instalación Base */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-surface border border-electric/20 rounded-xl p-6 mb-10 max-w-3xl mx-auto text-left">
            <h3 className="font-display text-[1rem] font-bold text-oil mb-2">Costo de Instalación Base</h3>
            <p className="text-[0.85rem] text-electric font-semibold mb-1">Aplica a Plan Plus y Plan Pro</p>
            <p className="text-[0.95rem] text-electric font-semibold mb-2">
              5 UF por local <span className="text-text-light font-normal">(pago único)</span>
            </p>
            <p className="text-[0.85rem] text-text-light leading-relaxed">
              Incluye: Configuración del sistema en el local, activación de cuenta y usuarios, implementación inicial, capacitación operativa básica, puesta en marcha del sistema y asesoramiento.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start max-w-[400px] md:max-w-none mx-auto"
            variants={containerVariants}
            {...animProps}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.title}
                variants={itemVariants}
                className={`rounded-xl border p-9 transition-all duration-[400ms] card-glow pointer-track ${
                  plan.badge
                    ? 'bg-surface border-electric/30 shadow-glow md:scale-[1.03]'
                    : 'bg-surface border-border-soft hover:shadow-lg hover:-translate-y-1.5'
                }`}
              >
                {plan.badge && (
                  <span className="inline-block bg-electric text-oil font-tech text-[0.6rem] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full mb-4">
                    {plan.badge}
                  </span>
                )}
                <h3 className="font-display text-[1.2rem] font-bold text-oil mb-1">{plan.title}</h3>
                {plan.subtitle && (
                  <p className="text-[0.8rem] text-electric font-semibold mb-4">{plan.subtitle}</p>
                )}

                {plan.priceMonthly && plan.priceAnnual ? (
                  <div className="mb-6 pb-5 border-b border-border space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-[2.2rem] font-extrabold text-oil leading-none">{plan.priceMonthly}</span>
                      <span className="text-[0.85rem] text-text-light">/mes</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-[1.6rem] font-extrabold text-electric leading-none">{plan.priceAnnual}</span>
                      <span className="text-[0.85rem] text-text-light">/mes · Plan Anual</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2 mb-6 pb-5 border-b border-border">
                    <span className="font-display text-[2.2rem] font-extrabold text-oil leading-none">{plan.price}</span>
                    <span className="text-[0.85rem] text-text-light">{plan.period}</span>
                  </div>
                )}

                <ul className="mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="text-[0.85rem] text-text-light py-1.5 border-b border-oil/4 last:border-none last:font-bold last:text-oil leading-[1.5]">
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="block text-center bg-electric text-oil font-bold text-[0.9rem] px-6 py-3 rounded-sm transition-all hover:shadow-[0_0_24px_rgba(0,207,255,0.3)] hover:-translate-y-0.5"
                >
                  Solicitar Presupuesto
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

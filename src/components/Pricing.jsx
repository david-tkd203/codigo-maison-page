import { motion } from 'motion/react';
import { containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

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
      'Soluciones tecnológicas creadas específicamente para la operación interna de cada negocio',
      'Un sistema diseñado a la medida del modelo de negocio particular de cada organización',
    ],
  },
];

export default function Pricing() {
  const animProps = useAccessibleAnimation();

  return (
    <section className="bg-bg relative" id="pricing">

      <div className="pt-24"></div>

      {/* ════════════════════════════════════════
          HIGHLIGHTS
          ════════════════════════════════════════ */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Todo en Uno</span>
            <h2 className="section-title">8 Funcionalidades para la Gestión Gastronómica</h2>
            <p className="section-subtitle mx-auto">Cada área de la operación se gestiona desde una única plataforma, sin sistemas dispersos ni integraciones costosas.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {highlights.map((h, i) => (
              <motion.div key={h.title}
                className="bg-surface rounded-xl border border-border-soft p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-electric/30 card-glow"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <span className="w-10 h-10 bg-electric/8 rounded-xl flex items-center justify-center mb-3.5 text-electric">{h.icon}</span>
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
            <h2 className="section-title">El Plan que Impulsa su Restaurante</h2>
            <p className="section-subtitle mx-auto mb-8">
              Desde la digitalización básica hasta una solución completa a medida. Todos los planes incluyen instalación y capacitación.
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
              Incluye configuración del sistema en el local, activación de cuenta y usuarios, implementación inicial, capacitación operativa básica, puesta en marcha del sistema y asesoramiento continuo.
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

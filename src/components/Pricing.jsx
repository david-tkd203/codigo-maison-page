import { motion } from 'motion/react';
import { containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

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
    <section className="bg-bg py-24 relative" id="pricing">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="section-tag">Planes y Presupuestos</span>
        <h2 className="section-title">RESTORANT SYSTEM</h2>
        <p className="section-subtitle mx-auto mb-8">
          Sistema de gestión para restaurantes con planes flexibles y transparentes.
        </p>

        {/* Instalación Base */}
        <div className="bg-surface border border-electric/20 rounded-xl p-6 mb-10 max-w-3xl mx-auto text-left">
          <h3 className="font-display text-[1rem] font-bold text-oil mb-2">Costo de Instalación Base</h3>
          <p className="text-[0.85rem] text-electric font-semibold mb-1">Aplica a Plan Plus y Plan Pro</p>
          <p className="text-[0.95rem] text-electric font-semibold mb-2">
            5 UF por local <span className="text-text-light font-normal">(pago único)</span>
          </p>
          <p className="text-[0.85rem] text-text-light leading-relaxed">
            Incluye: Configuración del sistema en el local, activación de cuenta y usuarios, implementación inicial, capacitación operativa básica, puesta en marcha del sistema y asesoramiento.
          </p>
        </div>
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
    </section>
  );
}

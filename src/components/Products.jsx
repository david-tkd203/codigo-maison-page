import { motion } from 'motion/react';
import { sectionVariants, containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

const products = [
  {
    id: 'restologistic',
    name: 'RestoLogistic',
    tagline: 'El Cerebro de tu Operación Gastronómica',
    desc: 'Una solución integral desarrollada a medida que une la logística avanzada con las necesidades del sector HORECA. Automatización completa del ciclo operativo, desde la compra a proveedores hasta la salida del plato a la mesa.',
    features: [
      'Gestión de Compras — Automatización de Órdenes de Compra (OC), conciliación con proveedores y control de precios dinámico.',
      'Control de Inventario — Escaneo inteligente de códigos de barras con alertas automáticas de stock crítico y mermas.',
      'Omnicanalidad de Pedidos — Centralización de órdenes desde delivery, salón y take-away para una cocina sincronizada.',
      'Trazabilidad de Cadena de Suministro — Seguimiento en tiempo real desde la orden al proveedor hasta la recepción en cocina.',
    ],
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'hmed',
    name: 'HMED',
    tagline: 'El Ecosistema de Salud Interconectado',
    desc: 'Plataforma disruptiva de desarrollo propio diseñada para centralizar la historia médica, automatizar procesos clínicos y mejorar la atención al paciente en todas las instituciones de salud.',
    features: [
      'Ficha Clínica Universal — Registro médico continuo y accesible para el paciente en todas las instituciones, con datos estructurados y portabilidad total.',
      'Gestión de Ciclo Médico — Automatización de citas, recetas digitales, órdenes de estudio y seguimiento de tratamientos en un solo lugar.',
      'Interoperabilidad Segura — Intercambio de datos clínicos bajo los más altos estándares de privacidad, cifrado y cumplimiento normativo.',
      'Telemedicina & Monitoreo Remoto — Consultas virtuales, seguimiento de pacientes crónicos y alertas inteligentes integradas en la historia clínica.',
    ],
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
  },
];

export default function Products() {
  const animProps = useAccessibleAnimation();

  return (
    <motion.section className="section-grid-bg py-24" id="products" variants={sectionVariants} {...animProps}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="section-tag">Productos Destacados</span>
        <h2 className="section-title">Proyectos de Referencia</h2>
        <p className="section-subtitle mx-auto mb-12">
          El resultado de años de ingeniería boutique: plataformas desarrolladas a medida que integran automatización, inteligencia de datos y diseño centrado en el usuario para transformar industrias enteras.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div variants={containerVariants} {...animProps}>
          {products.map((p) => (
            <motion.div className="bg-surface rounded-[32px] border border-border-soft p-6 md:p-10 lg:p-12 mb-7 transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-lg hover:border-electric/15 card-glow" key={p.id} variants={itemVariants}>
              <div className="flex items-center gap-5 mb-5">
                <div className="w-14 h-14 bg-electric/8 rounded-[14px] flex items-center justify-center text-electric flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <span className="inline-block font-tech text-[0.6rem] font-semibold tracking-[2.5px] uppercase text-electric bg-electric/8 px-3 py-1 rounded-full mb-1.5">{p.name}</span>
                  <h3 className="font-display text-[1.3rem] font-bold text-oil">{p.tagline}</h3>
                </div>
              </div>
              <p className="text-[0.95rem] text-text-light leading-[1.7] mb-6 max-w-[700px]">{p.desc}</p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.85rem] text-text leading-[1.5] p-4 bg-surface rounded-md border border-border transition-all duration-300 hover:border-electric/20 hover:bg-electric/3">
                    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="w-4 h-4 flex-shrink-0 mt-0.5 text-electric">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

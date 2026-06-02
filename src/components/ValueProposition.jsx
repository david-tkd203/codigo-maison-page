import { memo } from 'react';
import { motion } from 'motion/react';
import { sectionVariants, containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

const items = [
  {
    title: 'Arquitectura Legal-by-Design & Security-First',
    text: 'No solo desarrollamos código; construimos infraestructuras que nacen cumpliendo normativas internacionales y estándares de ciberseguridad. La protección de datos no es un módulo extra, es la base de nuestra construcción.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Ingeniería Boutique (Dedicación Exclusiva)',
    text: 'Operamos bajo un modelo de células de desarrollo enfocadas. Esto garantiza que cada proyecto reciba un análisis profundo y una ejecución personalizada, asegurando que el software se adapte al negocio y no el negocio al software.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Escalabilidad Evolutiva',
    text: 'Creamos tecnología preparada para el mañana. Nuestras soluciones no quedan obsoletas; están diseñadas modularmente para crecer en volumen de datos y complejidad operativa junto a la expansión de tu empresa.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

const ValueProposition = memo(function ValueProposition() {
  const animProps = useAccessibleAnimation();

  return (
    <motion.section className="section-grid-bg py-24" id="value-prop" variants={sectionVariants} {...animProps}>
      <div className="max-w-[1200px] mx-auto px-6 text-center mb-12">
        <span className="section-tag">El Diferencial Maison</span>
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <p className="section-subtitle mx-auto">
          El software correcto no solo resuelve problemas de hoy — construye ventajas para mañana. Conocé nuestro diferencial.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div className="grid md:grid-cols-3 gap-7" variants={containerVariants} {...animProps}>
          {items.map((item) => (
            <motion.div className="bg-surface rounded-lg border border-border-soft p-6 md:p-10 transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-lg hover:border-electric/30 card-glow card-top-line" key={item.title} variants={itemVariants}>
              <div className="w-14 h-14 bg-electric/8 rounded-[14px] flex items-center justify-center mb-6 text-electric">
                {item.icon}
              </div>
              <h3 className="font-display text-[1.1rem] font-bold mb-3 text-oil relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-electric after:transition-all after:duration-[350ms] after:rounded-sm hover:after:w-full">{item.title}</h3>
              <p className="text-[0.9rem] text-text-light leading-[1.7]">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

export default ValueProposition;

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { motion } from 'motion/react';
import { sectionVariants, containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

const services = [
  {
    title: 'Ecosistemas Web & Cloud',
    text: 'Automatización de flujos críticos de negocio con aplicaciones web robustas, escalables y seguras desplegadas en la nube. Desarrollamos a medida cada solución para que se adapte perfectamente a tu operación.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
  },
  {
    title: 'Mobile Experience',
    text: 'Apps nativas e híbridas de alto rendimiento que conectan tu marca con los usuarios donde sea que estén, con diseño centrado en la experiencia y desarrollo totalmente personalizado.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/>
      </svg>
    ),
  },
  {
    title: 'Automatización de Procesos Inteligentes',
    text: 'Transformamos tareas repetitivas en flujos automatizados impulsados por lógica inteligente. Diseñamos pipelines de automatización (RPA, BPM, workflows) que conectan tus sistemas, eliminan cuellos de botella y liberan a tu equipo para lo estratégico.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
  {
    title: 'Sistemas de Gestión Empresarial (ERP)',
    text: 'Desarrollamos plataformas de gestión integral totalmente a medida de tu negocio. Desde control de inventario y facturación hasta módulos de CRM, compras y reporting ejecutivo, creamos ecosistemas administrativos que centralizan toda tu operación.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    title: 'Data Intelligence & Analytics',
    text: 'Convertimos datos dispersos en decisiones inteligentes. Implementamos pipelines de datos, dashboards interactivos, tableros ejecutivos y sistemas de reporting automatizados que te dan visibilidad en tiempo real sobre cada aspecto de tu negocio.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Consultoría en Ciberseguridad',
    text: 'Blindaje y auditoría de activos digitales con un enfoque Security-by-Design. Integramos capas de protección en cada capa del sistema — desde la infraestructura hasta la aplicación — asegurando la continuidad y cumplimiento normativo de tu negocio.',
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

export default function Solutions() {
  const gridRef = useRef(null);
  const animProps = useAccessibleAnimation();

  // Scanner reveal: clip-path scan line effect
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const cards = grid.querySelectorAll('.solution-card');
        cards.forEach((card, i) => {
          card.style.clipPath = 'inset(0 0 100% 0)';
          animate(card, {
            clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
            duration: 900,
            easing: 'easeOutCubic',
            delay: i * 150,
          });
        });
        observer.unobserve(entry.target);
      },
      { threshold: 0.15 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section className="section-grid-bg py-24" id="solutions" variants={sectionVariants} {...animProps}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="section-tag">Servicios</span>
        <h2 className="section-title">Nuestras Soluciones</h2>
        <p className="section-subtitle mx-auto mb-12">
          Desde el desarrollo de software a medida hasta la automatización inteligente de procesos — todo lo que tu negocio necesita para dar el salto digital.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef} variants={containerVariants} {...animProps}>
          {services.map((s) => (
            <motion.div
              className="bg-surface rounded-lg border border-border-soft p-6 md:p-9 transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(7,43,58,0.1)] card-glow solution-card"
              key={s.title}
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-electric to-cyan-glow opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              <div className="w-12 h-12 bg-electric/8 rounded-xl flex items-center justify-center mb-5 text-electric">
                {s.icon}
              </div>
              <h3 className="font-display text-base font-bold mb-2.5 text-oil">{s.title}</h3>
              <p className="text-[0.88rem] text-text-light leading-[1.7]">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

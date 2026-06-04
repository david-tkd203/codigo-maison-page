import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { motion } from 'motion/react';
import { sectionVariants, containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

const sectors = [
  { label: 'Restaurantes y Gastronomía', pct: 44, desc: 'Optimización de la experiencia y el control operativo del sector gastronómico.' },
  { label: 'Logística y Supply Chain', pct: 30, desc: 'Eficiencia total en la cadena de suministro con trazabilidad en tiempo real.' },
  { label: 'Clínicas y HealthTech', pct: 24, desc: 'Gestión de datos médicos con rigor técnico y cumplimiento normativo.' },
  { label: 'Sectores Emergentes', pct: 12, desc: 'Soluciones para hotelería, propiedad intelectual y más.' },
  { label: 'Otros', pct: 10, desc: 'Transformación digital a medida para cualquier industria.' },
];

export default function Expertise() {
  const sectionRef = useRef(null);
  const animProps = useAccessibleAnimation();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const counters = section.querySelectorAll('.exp-pct');
        const bars = section.querySelectorAll('.exp-bar-fill');

        // Animate bars
        bars.forEach((bar) => {
          const w = bar.getAttribute('data-width');
          if (w) setTimeout(() => { bar.style.width = w + '%'; }, 200);
        });

        // Animate counters with animejs smooth interpolation
        counters.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target'));
          if (isNaN(target)) return;
          el.textContent = '0%';
          animate(el, {
            innerText: [0, target],
            duration: 1800,
            easing: 'easeOutQuart',
            delay: 300,
            round: 1,
          });
        });

        observer.unobserve(entry.target);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section className="bg-bg py-24" id="expertise" ref={sectionRef} variants={sectionVariants} {...animProps}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12 text-center">
          <div>
            <span className="section-tag">Verticales de Experticia</span>
            <h2 className="section-title">Sectores que Transformamos</h2>
            <p className="section-subtitle mx-auto">Resultados comprobados en las industrias que definen el futuro.</p>
          </div>
        </div>
        <motion.div className="grid md:grid-cols-2 gap-9" variants={containerVariants} {...animProps}>
          {sectors.map((s) => (
            <motion.div className="bg-surface rounded-md border border-border p-6 relative overflow-hidden transition-all duration-300 hover:border-electric/20 hover:shadow-[0_0_20px_rgba(0,207,255,0.05)] group" key={s.label} variants={itemVariants}>
              <div className="absolute top-0 left-0 w-0.5 h-0 bg-gradient-to-b from-electric to-transparent transition-all duration-500 group-hover:h-full rounded-r-[2px]"></div>
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="font-display text-base font-semibold text-oil">{s.label}</h3>
                <span className="exp-pct font-tech text-[1.4rem] font-bold text-electric" data-target={s.pct}>0%</span>
              </div>
              <div className="exp-bar-bg w-full h-2 rounded-full mb-2.5">
                <div className="exp-bar-fill w-0 transition-[width] duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" data-width={s.pct} />
              </div>
              <p className="text-[0.85rem] text-text-light leading-[1.5]">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

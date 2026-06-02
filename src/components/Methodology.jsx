import { motion } from 'motion/react';
import { sectionVariants, containerVariants, itemVariants, useAccessibleAnimation } from '../lib/animations';

const steps = [
  { num: '01', title: 'Levantamiento & Estrategia', desc: 'Entendemos tu dolor operativo, analizamos tu negocio y definimos los requisitos exactos de la solución.', tag: 'Diagnóstico' },
  { num: '02', title: 'Arquitectura & Diseño', desc: 'Modelamos la solución técnica con estándares de ciberseguridad desde el primer boceto.', tag: 'Diseño' },
  { num: '03', title: 'Desarrollo Ágil & Ciberseguridad', desc: 'Construcción iterativa con entregas de valor frecuentes y protección integrada en cada capa.', tag: 'Construcción' },
  { num: '04', title: 'Despliegue & Evolución', desc: 'Lanzamiento monitoreado y soporte continuo con actualizaciones evolutivas.', tag: 'Producción' },
];

export default function Methodology() {
  const animProps = useAccessibleAnimation();

  return (
    <motion.section className="bg-bg py-24" id="methodology" variants={sectionVariants} {...animProps}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="section-tag">Metodología Maison</span>
        <h2 className="section-title">Cómo Trabajamos</h2>
        <p className="section-subtitle mx-auto mb-12">
          Un proceso transparente y riguroso desde el diagnóstico hasta la evolución continua.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div className="flex items-start justify-center gap-0 flex-wrap md:flex-nowrap" variants={containerVariants} {...animProps}>
          {steps.map((s, i) => (
            <motion.div className="flex items-center flex-1 max-w-[260px]" key={s.num} variants={itemVariants}>
              <div className="text-center relative px-3 flex-1">
                <div className="font-tech text-[2.8rem] font-extrabold text-electric/50 leading-none mb-1 transition-all duration-[400ms] hover:opacity-100 hover:scale-110">{s.num}</div>
                <span className="inline-block font-tech text-[0.55rem] font-semibold tracking-widest uppercase text-electric bg-electric/8 px-2.5 py-[3px] rounded-full mb-2.5 transition-all duration-300 hover:bg-electric/15">{s.tag}</span>
                <h3 className="font-display text-base font-bold mb-2.5 text-oil transition-colors duration-300 hover:text-electric">{s.title}</h3>
                <p className="text-[0.83rem] text-text-light leading-[1.65] max-w-[220px] mx-auto">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-shrink-0 w-8 flex items-center justify-center text-electric/20 transition-all duration-300 hover:text-electric hover:translate-x-0.5">
                  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="w-4 h-4">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

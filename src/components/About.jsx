import { memo } from 'react';
import { motion } from 'motion/react';
import { sectionVariants, useAccessibleAnimation } from '../lib/animations';

const About = memo(function About() {
  const animProps = useAccessibleAnimation();

  return (
    <motion.section className="bg-bg py-24" id="about" variants={sectionVariants} {...animProps}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="section-tag">El ADN de Código Maison</span>
        <h2 className="section-title">Identidad Corporativa</h2>
      </div>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center flex-wrap gap-8 max-w-4xl mx-auto">
          <div className="max-w-sm bg-surface rounded-lg border border-border p-8 md:p-12 transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-lg card-glow">
            <div className="w-14 h-14 bg-electric/8 rounded-[13px] flex items-center justify-center text-electric">
              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" className="w-6 h-6">
                <path d="M2 12h3l2-3 3 3 3-6 3 3 2-3 3 3h2" />
              </svg>
            </div>
            <h3 className="font-display text-[1.3rem] font-bold mb-3.5 text-oil">Visión</h3>
            <p className="text-[0.92rem] text-text-light leading-[1.75]">Ser el referente regional en arquitectura de software a medida, reconocidos por redefinir la eficiencia empresarial. Aspiramos a ser el aliado de confianza que simplifica la complejidad tecnológica, garantizando siempre la integridad y el valor estratégico de la información de nuestros clientes.</p>

          </div>
          <div className="max-w-sm bg-surface rounded-lg border border-border p-8 md:p-12 transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-lg card-glow">
            <div className="w-14 h-14 bg-electric/8 rounded-[13px] flex items-center justify-center text-electric">
              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" className="w-6 h-6">
                <path d="M2 12h3l2-3 3 3 3-6 3 3 2-3 3 3h2" />
              </svg>
            </div>
            <h3 className="font-display text-[1.3rem] font-bold mb-3.5 text-oil">Visión</h3>
            <p className="text-[0.92rem] text-text-light leading-[1.75]">Ser el referente regional en arquitectura de software a medida, reconocidos por redefinir la eficiencia empresarial. Aspiramos a ser el aliado de confianza que simplifica la complejidad tecnológica, garantizando siempre la integridad y el valor estratégico de la información de nuestros clientes.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
});

export default About;

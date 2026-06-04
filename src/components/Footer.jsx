import { motion } from 'motion/react';
import { sectionVariants, useAccessibleAnimation } from '../lib/animations';

export default function Footer() {
  const animProps = useAccessibleAnimation();

  return (
    <motion.footer className="bg-oil text-white/65 pt-16 pb-8" variants={sectionVariants} {...animProps}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          <div className="footer-brand">
            <img src="/images/codigo_maison_logo_sin_fondo.png" alt="Código Maison" className="h-8 w-auto mb-4" loading="lazy" />
            <p className="text-[0.85rem] leading-[1.7] max-w-[280px]">Ingeniería de software que transforma el presente de tu negocio. Soluciones a medida con tecnología de vanguardia.</p>
          </div>
          <div className="footer-col">
            <h4 className="text-white font-tech text-[0.75rem] font-medium uppercase tracking-widest mb-4">Navegación</h4>
            <a href="#pricing" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Restorant System</a>
            <a href="#value-prop" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Diferencial</a>
            <a href="#expertise" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Industrias</a>
            <a href="#solutions" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Soluciones</a>
            <a href="#contact" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Contacto</a>
          </div>
          <div className="footer-col">
            <h4 className="text-white font-tech text-[0.75rem] font-medium uppercase tracking-widest mb-4">Soluciones</h4>
            <a href="#solutions" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Apps Web</a>
            <a href="#solutions" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Mobile</a>
            <a href="#solutions" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Sistemas ERP</a>
            <a href="#solutions" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">Ciberseguridad</a>
          </div>
          <div className="footer-col">
            <h4 className="text-white font-tech text-[0.75rem] font-medium uppercase tracking-widest mb-4">Contacto</h4>
            <a href="https://wa.me/56973850360" target="_blank" rel="noopener noreferrer" className="block text-[0.85rem] text-white/55 mb-2.5 transition-colors hover:text-electric">+56 9 7385 0360</a>
            <span className="block text-[0.85rem] text-white/55 mb-2.5">San Antonio 385 Of. 201, Santiago Centro, Chile</span>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[0.8rem]">
          <span>&copy; 2026 Código Maison. Todos los derechos reservados.</span>
          <span>Diseñado con tecnología de vanguardia</span>
        </div>
      </div>
    </motion.footer>
  );
}

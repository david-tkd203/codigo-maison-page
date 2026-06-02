import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '../lib/animations';
import { useAnimeLogo } from '../hooks/useAnimeLogo';
import ElectricParticles from './ElectricParticles';

function MagneticButton({ children, href, className }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
    };

    const onLeave = () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 420);
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (href) {
    return <a href={href} className={className} ref={btnRef}>{children}</a>;
  }

  return <button className={className} ref={btnRef}>{children}</button>;
}

const systemSignals = [
  { value: 'Security-First', label: 'ciberseguridad desde la arquitectura' },
  { value: 'Cloud + Mobile', label: 'ecosistemas tecnológicos escalables' },
  { value: 'Legal-by-Design', label: 'cumplimiento y datos protegidos' },
];

export default function Hero() {
  const svgRef = useAnimeLogo();
  const stageRef = useRef(null);

  // Parallax 3D tilt
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const hero = stage.closest('.hero');
    if (!hero) return;

    const onMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      stage.style.setProperty('--tilt-x', `${((y - cy) / cy) * -7}deg`);
      stage.style.setProperty('--tilt-y', `${((x - cx) / cx) * 9}deg`);
      hero.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      hero.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    };

    const onLeave = () => {
      stage.style.setProperty('--tilt-x', '0deg');
      stage.style.setProperty('--tilt-y', '0deg');
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section
      className="hero min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-24 text-oil hero-bg"
      id="hero"
    >
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="hero-scanline" />
      <ElectricParticles />

      <div className="max-w-[1200px] mx-auto px-6 w-full relative z-[2] grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(430px,1.05fr)] gap-[clamp(40px,6vw,90px)] items-center">
        <motion.div className="max-w-[690px] lg:max-w-none text-center lg:text-left" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 bg-surface/90 border border-electric/28 rounded-full px-4 py-2.5 font-tech text-[0.72rem] text-oil tracking-widest uppercase mb-6 shadow-[0_14px_42px_rgba(0,207,255,0.12)]">
            <span className="badge-dot" />
            Código Maison // Ingeniería de Alto Impacto
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="font-display text-[clamp(3.1rem,6.3vw,6.75rem)] font-black leading-[0.93] tracking-[-0.07em] text-oil mb-6 [&::first-letter]:text-electric">
              Ingeniería Digital para el Liderazgo Empresarial.
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-[clamp(1rem,1.35vw,1.16rem)] text-oil/74 leading-[1.78] mb-8 max-w-[640px] mx-auto lg:mx-0">
              En Código Maison, transformamos la complejidad operativa en flujos de trabajo inteligentes.
              Diseñamos ecosistemas tecnológicos que optimizan tu gestión, blindan tu infraestructura
              y proyectan tu alcance hacia el futuro digital.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap mb-[34px] justify-center lg:justify-start">
            <MagneticButton href="#contact" className="btn-primary min-h-14 inline-flex items-center justify-center gap-2.5 font-body font-extrabold text-[0.94rem] px-7 py-4 rounded-2xl bg-gradient-to-br from-electric to-cyan-glow text-oil border border-electric/70 shadow-[0_18px_42px_rgba(0,207,255,0.22)] cursor-pointer relative overflow-hidden isolate will-change-transform before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/64 before:to-transparent before:-translate-x-[115%] before:transition-transform before:duration-500 before:ease-out hover:before:translate-x-[115%] hover:shadow-[0_22px_54px_rgba(0,207,255,0.28),0_0_42px_rgba(111,251,255,0.38)]">
              Solicitar Presupuesto
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#solutions" className="btn-outline min-h-14 inline-flex items-center justify-center gap-2.5 font-body font-extrabold text-[0.94rem] px-7 py-4 rounded-2xl bg-surface/85 text-oil border border-oil/14 shadow-[0_14px_34px_rgba(7,43,58,0.08)] cursor-pointer relative overflow-hidden isolate will-change-transform before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/64 before:to-transparent before:-translate-x-[115%] before:transition-transform before:duration-500 before:ease-out hover:before:translate-x-[115%] hover:border-electric/58 hover:shadow-[0_18px_44px_rgba(0,207,255,0.14),0_0_28px_rgba(111,251,255,0.2)]">
              Explorar Soluciones
            </MagneticButton>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[500px] mx-auto lg:mx-0 lg:max-w-none">
            {systemSignals.map((signal) => (
              <div className="relative overflow-hidden bg-surface/85 border border-electric/20 rounded-[18px] p-4 shadow-[0_16px_42px_rgba(7,43,58,0.07)] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-cyan-glow/22 after:to-transparent after:translate-x-[-120%] after:animate-[card-glint_4.4s_ease-in-out_infinite]" key={signal.value}>
                <strong className="block font-tech text-[0.86rem] text-oil mb-1.5 tracking-[0.04em]">{signal.value}</strong>
                <span className="block text-oil/58 text-[0.76rem] leading-[1.35]">{signal.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="min-h-[300px] md:min-h-[450px] lg:min-h-[650px] flex justify-center items-center perspective-[1200px] order-first lg:order-last" aria-label="Visualización futurista con esfera tecnológica">
          <div className="tech-stage" ref={stageRef}>
            <div className="stage-ring stage-ring-a" />
            <div className="stage-ring stage-ring-b" />
            <div className="stage-ring stage-ring-c" />

            <svg className="circuit-map" viewBox="0 0 560 560" fill="none" ref={svgRef} aria-hidden="true">
              <path className="draw-path" d="M80 276H158C190 276 194 225 226 225H318C350 225 354 176 386 176H482" stroke="#00CFFF" strokeWidth="2.8" strokeLinecap="round" />
              <path className="draw-path" d="M82 363H146C182 363 184 406 220 406H318C352 406 354 352 388 352H480" stroke="#6FFBFF" strokeWidth="2.4" strokeLinecap="round" />
              <path className="draw-path" d="M280 74V148C280 178 322 182 322 214V330C322 360 280 364 280 394V482" stroke="#072B3A" strokeWidth="2.2" strokeLinecap="round" />
              <path className="draw-path" d="M138 132L205 199M423 132L356 199M136 430L205 365M424 430L356 365" stroke="rgba(0,207,255,0.55)" strokeWidth="2" strokeLinecap="round" />
              <circle className="draw-path" cx="280" cy="280" r="190" stroke="rgba(0,207,255,0.28)" strokeWidth="2" />
              <circle className="draw-path" cx="280" cy="280" r="126" stroke="rgba(7,43,58,0.18)" strokeWidth="1.6" strokeDasharray="10 14" />
              <circle className="draw-dot" cx="80" cy="276" r="5" fill="#00CFFF" />
              <circle className="draw-dot" cx="482" cy="176" r="5" fill="#00CFFF" />
              <circle className="draw-dot" cx="82" cy="363" r="5" fill="#6FFBFF" />
              <circle className="draw-dot" cx="480" cy="352" r="5" fill="#6FFBFF" />
              <circle className="draw-dot" cx="280" cy="74" r="5" fill="#072B3A" />
              <circle className="draw-dot" cx="280" cy="482" r="5" fill="#072B3A" />
            </svg>

            <div className="core-sphere">
              <div className="sphere-ring" />
              <div className="sphere-ring" style={{ width: '70%', height: '70%', inset: '15%' }} />
              <div className="sphere-ring" style={{ width: '40%', height: '40%', inset: '30%', borderStyle: 'dashed' }} />
              <div className="logo-glow" />
              <video
                className="logo-video"
                src="/gif/logo-electric.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>

            <div className="holo-platform"><span /><span /><span /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

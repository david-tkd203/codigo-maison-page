import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { sectionVariants, useAccessibleAnimation } from '../lib/animations';
import emailjs from '@emailjs/browser';

const initial = {
  name: '', company: '', sector: '', projectType: '', budget: '', message: '',
  email: '', whatsapp: '',
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const animProps = useAccessibleAnimation();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Validaciones ──
    if (!form.name.trim() || !form.company.trim() || !form.message.trim()) {
      setToast({ type: 'error', text: 'Completá los campos obligatorios.' });
      setTimeout(() => setToast(null), 3500);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setToast({ type: 'error', text: 'Ingresá un correo electrónico válido.' });
      setTimeout(() => setToast(null), 3500);
      return;
    }

    if (form.whatsapp && !/^[\d\s+]+$/.test(form.whatsapp)) {
      setToast({ type: 'error', text: 'Ingresá un número de WhatsApp válido.' });
      setTimeout(() => setToast(null), 3500);
      return;
    }

    // ── Datos comunes para ambas plantillas ──
    const templateParams = {
      name: form.name.trim(),
      company: form.company.trim(),
      sector: form.sector || 'No especificado',
      whatsapp: form.whatsapp || 'No proporcionado',
      email: form.email.trim(),
      projectType: form.projectType || 'No especificado',
      budget: form.budget || 'No especificado',
      message: form.message.trim(),
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const templateTeam = import.meta.env.VITE_EMAILJS_TEMPLATE_TEAM;
    const templateClient = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT;

    // Forzar destinatarios desde el código (anula lo configurado en el dashboard)
    const teamParams = { ...templateParams, to_email: 'dnanculeo@codigomaison.com' };
    const clientParams = { ...templateParams, to_email: form.email.trim() };

    setSending(true);

    try {
      // ── Disparar ambos correos en paralelo ──
      await Promise.all([
        emailjs.send(serviceId, templateTeam, teamParams, publicKey),
        emailjs.send(serviceId, templateClient, clientParams, publicKey),
      ]);

      setToast({
        type: 'success',
        text: '¡Mensaje enviado con éxito! Te contactaremos a la brevedad.',
      });
      setForm(initial);
    } catch {
      setToast({
        type: 'error',
        text: 'Error al enviar. Escribinos directamente a contact@codigomaison.com',
      });
    } finally {
      setSending(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <motion.section className="bg-bg py-24" id="contact" variants={sectionVariants} {...animProps}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="section-tag">Briefing de Proyecto</span>
        <h2 className="section-title">¿Listo para dar el siguiente paso?</h2>
        <p className="section-subtitle mx-auto mb-12">
          Contanos tu desafío y diseñaremos la solución a tu medida.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-[3.75rem] items-start">
          <div className="bg-surface rounded-3xl border border-border-soft p-8">
            <h3 className="font-display text-[1.5rem] font-bold mb-4 text-oil">Conversemos</h3>
            <p className="text-text-light leading-[1.7] mb-7">Cada proyecto comienza con una conversación. Completá el formulario y te responderemos en menos de 24 horas.</p>
            <div className="flex items-center gap-3 mb-3.5 text-[0.9rem] text-text-light">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-electric fill-none stroke-[1.5] flex-shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>contact@codigomaison.com</span>
            </div>
            <div className="flex items-center gap-3 text-[0.9rem] text-text-light">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-electric fill-none stroke-[1.5] flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>San Antonio 385 Of. 201, Santiago Centro, Chile</span>
            </div>
          </div>

          <form className="bg-surface rounded-3xl border border-border-soft p-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="field-name" className="block text-[0.82rem] font-semibold text-oil mb-1.5">Nombre del Representante *</label>
                <input id="field-name" name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" required
                  className="w-full px-4 py-3 border border-border rounded-sm bg-bg text-text font-body text-[0.9rem] outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,207,255,0.1)]" />
              </div>
              <div className="mb-4">
                <label htmlFor="field-company" className="block text-[0.82rem] font-semibold text-oil mb-1.5">Empresa / Organización *</label>
                <input id="field-company" name="company" value={form.company} onChange={handleChange} placeholder="Nombre de tu empresa" required
                  className="w-full px-4 py-3 border border-border rounded-sm bg-bg text-text font-body text-[0.9rem] outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,207,255,0.1)]" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="field-sector" className="block text-[0.82rem] font-semibold text-oil mb-1.5">Sector Industrial</label>
                <select id="field-sector" name="sector" value={form.sector} onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-sm bg-bg text-text font-body text-[0.9rem] outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,207,255,0.1)]">
                  <option value="">Seleccioná un sector</option>
                  <option value="logistica">Logística</option>
                  <option value="salud">Salud</option>
                  <option value="gastronomia">Gastronomía</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="field-project" className="block text-[0.82rem] font-semibold text-oil mb-1.5">Tipo de Proyecto</label>
                <select id="field-project" name="projectType" value={form.projectType} onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-sm bg-bg text-text font-body text-[0.9rem] outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,207,255,0.1)]">
                  <option value="">Seleccioná un tipo</option>
                  <option value="logistica">Logística</option>
                  <option value="restaurante">Restaurante / Gastronomía</option>
                  <option value="salud">Salud / Clínicas</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="field-email" className="block text-[0.82rem] font-semibold text-oil mb-1.5">Correo Electrónico *</label>
                <input id="field-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@empresa.com" required
                  className="w-full px-4 py-3 border border-border rounded-sm bg-bg text-text font-body text-[0.9rem] outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,207,255,0.1)]" />
              </div>
              <div className="mb-4">
                <label htmlFor="field-whatsapp" className="block text-[0.82rem] font-semibold text-oil mb-1.5">WhatsApp (Opcional)</label>
                <input id="field-whatsapp" name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} placeholder="+54 9 11 2345-6789"
                  className="w-full px-4 py-3 border border-border rounded-sm bg-bg text-text font-body text-[0.9rem] outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,207,255,0.1)]" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="field-budget" className="block text-[0.82rem] font-semibold text-oil mb-1.5">Rango de Presupuesto Estimado (Opcional)</label>
              <select id="field-budget" name="budget" value={form.budget} onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-sm bg-bg text-text font-body text-[0.9rem] outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,207,255,0.1)]">
                <option value="">Seleccioná un rango</option>
                <option value="menos-5k">Menos de $5,000 USD</option>
                <option value="5k-15k">$5,000 - $15,000 USD</option>
                <option value="15k-30k">$15,000 - $30,000 USD</option>
                <option value="mas-30k">Más de $30,000 USD</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="field-message" className="block text-[0.82rem] font-semibold text-oil mb-1.5">Contanos sobre tu necesidad *</label>
              <textarea id="field-message" name="message" value={form.message} onChange={handleChange} placeholder="Describí tu proyecto, desafío o idea..." required
                className="w-full px-4 py-3 border border-border rounded-sm bg-bg text-text font-body text-[0.9rem] outline-none transition-all duration-300 focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,207,255,0.1)] min-h-28 resize-y" />
            </div>
            <button type="submit" disabled={sending}
              className="w-full py-3.5 bg-electric text-oil font-bold rounded-sm font-body text-base border-none cursor-pointer mt-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,207,255,0.35)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando&hellip;
                </span>
              ) : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            role={toast.type === 'success' ? 'status' : 'alert'}
            className={`fixed bottom-8 right-8 px-7 py-4 rounded-md font-semibold shadow-lg z-[2000] max-w-[420px] ${
              toast.type === 'success'
                ? 'bg-oil text-white border-l-4 border-l-electric'
                : 'bg-red-900 text-white border-l-4 border-l-red-500'
            }`}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

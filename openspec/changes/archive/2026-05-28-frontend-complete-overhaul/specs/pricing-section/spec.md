# Pricing Section Specification

## Purpose

Redesign the orphaned `Pricing.jsx` component to present real Código Maison service tiers in USD, wire it into `App.jsx`, and apply Tailwind + motion animations. The old UF-based pricing and generic e-commerce features are removed.

## Requirements

### Requirement: App.jsx Integration

The system MUST import `Pricing` in `src/App.jsx` and render `<Pricing />` between `<Products />` and `<Methodology />`. The component MUST no longer be orphaned.

#### Scenario: Page scroll sequence

- GIVEN the page loads
- WHEN the user scrolls from top to bottom
- THEN the section order is: Hero → About → ValueProposition → Expertise → Solutions → Products → Pricing → Methodology → Contact → Footer

### Requirement: Three USD Tiers

The `Pricing.jsx` component MUST display exactly three pricing tiers with the following data:

1. **MVP (Starter)**
   - Price: `$4,000 USD`
   - Period: `proyecto inicial`
   - Features: `Análisis de requerimientos`, `Diseño UX/UI esencial`, `Desarrollo frontend + backend`, `Base de datos configurada`, `Despliegue en producción`, `Soporte post-lanzamiento 30 días`, `Documentación técnica`

2. **Growth (Mid)**
   - Price: `$8,000 USD`
   - Period: `proyecto evolutivo`
   - Badge: `Más solicitado`
   - Subtitle: `Web + Mobile + Automatizaciones`
   - Features: `Todo lo incluido en MVP`, `App móvil iOS/Android`, `Automatización de flujos`, `Integraciones con ERP/CRM`, `Panel administrativo avanzado`, `Notificaciones push/email`, `Reportes y analytics`, `Escalabilidad cloud`, `Soporte prioritario 90 días`, `Optimización de performance`

3. **Enterprise (Full)**
   - Price: `A medida`
   - Period: `consultar`
   - Features: `Todo lo incluido en Growth`, `ERP a medida`, `Seguridad enterprise (pentest, ISO 27001)`, `Infraestructura multi-cloud`, `Cumplimiento normativo (RGPD/Ley 25.326)`, `Disaster recovery y backups`, `Monitoreo 24/7`, `Squad dedicado`, `SLA garantizado`, `Capacitación interna`

The old `plans` array using UF currency, generic e-commerce features, and `Total Proyecto Referencial` block MUST be removed.

#### Scenario: Tier display

- GIVEN a visitor views the Pricing section
- WHEN the page renders
- THEN three cards are visible with the titles "MVP", "Growth", and "Enterprise"
- AND prices are "$4,000 USD", "$8,000 USD", and "A medida" respectively

#### Scenario: Growth tier highlighted

- GIVEN the three tiers render
- WHEN the user inspects the Growth card
- THEN it has a visual distinction (electric border, glow shadow, or scale)
- AND it displays the "Más solicitado" badge

### Requirement: Tailwind Refactor

All inline `<style>` blocks in `Pricing.jsx` MUST be removed. Styles MUST be replaced with Tailwind utility classes using the `@theme` tokens defined in `tailwind-v4-migration`:
- Section: `bg-surface relative py-24`
- Grid: `grid md:grid-cols-3 gap-7 items-start`
- Cards: `bg-white rounded-lg border border-border-soft p-9 relative transition-all duration-400 hover:-translate-y-1.5 hover:shadow-lg`
- Featured card: `border-electric/30 shadow-glow scale-[1.03] hover:scale-[1.03] hover:-translate-y-1.5`
- Badge: `inline-block bg-electric text-oil font-tech text-[0.6rem] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full mb-4`
- Price: `font-display text-[2.2rem] font-extrabold text-oil leading-none`
- Period: `text-[0.85rem] text-text-light`
- Feature list: `text-[0.85rem] text-text-light py-1.5 border-b border-oil/[0.04] last:border-b-0 last:font-bold last:text-oil`
- CTA button: `block w-full text-center bg-electric text-oil font-body font-bold text-[0.9rem] px-6 py-3 rounded-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,207,255,0.3)] hover:-translate-y-0.5`
- Responsive: `max-md:grid-cols-1 max-md:max-w-[400px] max-md:mx-auto`

#### Scenario: Mobile layout

- GIVEN a viewport width of 390px
- WHEN the Pricing section renders
- THEN the three cards stack vertically in a single column

### Requirement: Motion Animations

The `Pricing` section MUST use `motion.div` for scroll reveal and staggered card entrances:
- Parent grid: `variants={containerVariants}` with `staggerChildren: 0.12`
- Each card: `variants={itemVariants}` with `initial="hidden" whileInView="visible" viewport={{ once: true }}`
- The badge, title, subtitle, and price inside each card MAY animate with a subtle `y: [10, 0]` fade on card entry

#### Scenario: Scroll into Pricing

- GIVEN a visitor scrolls to the Pricing section
- WHEN it enters the viewport
- THEN the three cards fade in sequentially with a 120ms stagger

## Acceptance Criteria

- [ ] `App.jsx` renders `<Pricing />` between Products and Methodology
- [ ] `Pricing.jsx` displays exactly three tiers: MVP, Growth, Enterprise
- [ ] All prices are in USD or "A medida"; no UF references remain
- [ ] Features describe real Código Maison services (development, mobile, automation, ERP, analytics, security)
- [ ] No inline `<style>` block remains in `Pricing.jsx`
- [ ] Cards use Tailwind utility classes with brand tokens
- [ ] Motion stagger animations work for the three cards
- [ ] Growth tier has visual prominence (badge, border, shadow)
- [ ] `pnpm lint` passes with 0 errors

## Files Affected

| File | Change |
|------|--------|
| `src/App.jsx` | Add `Pricing` import and render between Products and Methodology |
| `src/components/Pricing.jsx` | Full redesign: new plans data, Tailwind classes, motion variants |

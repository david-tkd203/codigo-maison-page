# Design: Frontend Complete Overhaul

## Technical Approach

Replace inline `<style>` blocks with Tailwind v4 `@theme` tokens + utility classes. Replace `useScrollReveal` (IntersectionObserver) with `motion/react` `whileInView`. Remove `FuturisticStyles.jsx` (464 lines), redistributing pointer-move glow effects to per-component `onPointerMove` handlers + Tailwind. Redesign Pricing in USD. Fix Contact payload to match backend `PROJECT_TYPES`.

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|-------------|-----------|
| CSS system | Tailwind v4 + `@theme` | CSS Modules, styled-jsx | Proposal-mandated; eliminates 1,700 lines of inline styles |
| Animation lib | `motion@12.40.0` | animejs for reveals, GSAP | Declarative `whileInView` replaces imperative IntersectionObserver; animejs kept for Hero canvas |
| Pointer glow | Per-component `onPointerMove` + CSS var | Global event listener (FuturisticStyles) | Co-located with component; no global DOM queries |
| Pricing currency | USD tiers | UF, ARS | Target market is international; matches backend `INVESTMENT_RANGES` |
| `project_type` mapping | Align to backend `PROJECT_TYPES` | Add new choices to model | Backend already has `logistica/restaurante/salud/otro`; frontend must send matching values |
| Lazy loading | `React.lazy` for Methodology, Contact | No lazy loading | Both below fold; reduces initial bundle |

## Data Flow

```
Contact Form
  ├─ name (required)
  ├─ company (required)
  ├─ email (NEW, required) ──────→ Lead.email
  ├─ whatsapp (NEW, optional) ───→ Lead.whatsapp
  ├─ sector (select) ───────────→ Lead.message prefix (backend has no sector field)
  ├─ projectType (select) ──────→ Lead.project_type (MUST match: logistica|restaurante|salud|otro)
  ├─ budget (select) ───────────→ Lead.investment
  └─ message (required) ────────→ Lead.message
        POST /api/leads/ (JSON, no CSRF)
```

**Critical**: `project_type` select values MUST be `logistica|restaurante|salud|otro` (backend choices). `sector` has no backend field — prepend to `message` as `[Sector: gastronomia] Original message...`. `email` and `whatsapp` fields are added as form inputs.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/index.css` | Rewrite | `@import "tailwindcss"` + `@theme` block + custom keyframes + ElectricParticles canvas CSS |
| `src/App.jsx` | Modify | Add Pricing import, remove FuturisticStyles, remove App.css, add lazy loading for Methodology/Contact |
| `src/App.css` | Delete | Single empty line, unused |
| `src/components/FuturisticStyles.jsx` | Delete | 464 lines, effects distributed to components |
| `src/components/Pricing.jsx` | Redesign | 3 USD tiers (MVP/Growth/Enterprise), motion scroll reveal, Tailwind classes |
| `src/components/Contact.jsx` | Modify | Add email/whatsapp inputs, fix project_type values, sector prepend to message, Tailwind classes |
| `src/components/Hero.jsx` | Modify | Tailwind classes, useTextScramble on tagline, keep animejs for sphere |
| `src/components/About.jsx` | Modify | Tailwind classes, motion.div whileInView, onPointerMove glow |
| `src/components/ValueProposition.jsx` | Modify | Same pattern as About |
| `src/components/Expertise.jsx` | Modify | Same pattern |
| `src/components/Solutions.jsx` | Modify | Same pattern |
| `src/components/Products.jsx` | Modify | Same pattern |
| `src/components/Methodology.jsx` | Modify | Same pattern, React.lazy wrapped |
| `src/components/Navbar.jsx` | Modify | Tailwind classes |
| `src/components/Footer.jsx` | Modify | Tailwind classes |
| `src/components/ElectricParticles.jsx` | Keep | Canvas-based, minimal CSS in index.css |
| `src/hooks/useScrollReveal.js` | Delete | Replaced by motion whileInView |
| `src/hooks/useTextScramble.js` | Modify | Fix unused import lint error |
| `src/hooks/useAnimeLogo.js` | Modify | Fix unused import lint error |
| `src/assets/vite.svg` | Delete | Scaffolding |
| `src/assets/react.svg` | Delete | Scaffolding |
| `vite.config.js` | Modify | Add `@tailwindcss/vite` plugin |
| `package.json` | Modify | Add tailwindcss, @tailwindcss/vite, motion; remove react-doctor |
| `index.html` | Modify | lang="es", title, OG meta tags |

## Interfaces / Contracts

### Tailwind @theme Block (index.css)

```css
@import "tailwindcss";

@theme {
  --color-bg: #FFFFFF;
  --color-surface: #F8FAFC;
  --color-electric: #00CFFF;
  --color-oil: #072B3A;
  --color-cyan-glow: #6FFBFF;
  --color-text: #1a2e3f;
  --color-text-light: #5a6e7e;
  --color-border: rgba(7, 43, 58, 0.08);

  --font-display: 'Space Grotesk', 'Inter', sans-serif;
  --font-body: 'Satoshi', 'Inter', -apple-system, sans-serif;
  --font-tech: 'Orbitron', 'Space Grotesk', monospace;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-sm: 0 1px 3px rgba(7, 43, 58, 0.06);
  --shadow-md: 0 4px 16px rgba(7, 43, 58, 0.08);
  --shadow-lg: 0 12px 40px rgba(7, 43, 58, 0.1);
  --shadow-glow: 0 0 24px rgba(0, 207, 255, 0.25);
}
```

### Motion Scroll Reveal Pattern

```jsx
import { motion, useReducedMotion } from 'motion/react';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Usage: <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
```

### Futuristic Card Glow Pattern (replaces FuturisticStyles)

```jsx
const handlePointerMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};
// className="relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-transparent before:via-cyan-glow/26 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:pointer-events-none before:z-[-1]"
// style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,30%), rgba(111,251,255,0.28), transparent 30%), linear-gradient(145deg, rgba(255,255,255,0.96), rgba(247,253,255,0.88))' }}
// onPointerMove={handlePointerMove}
```

### Contact Payload Shape

```js
{
  name: 'string (required)',
  company: 'string (required)',
  email: 'user@example.com (NEW required)',
  whatsapp: '+5491112345678 (NEW optional)',
  project_type: 'logistica|restaurante|salud|otro (MUST match backend)',
  investment: 'menos-5k|5k-15k|15k-30k|mas-30k',
  message: '[Sector: gastronomia] User message text...'
}
```

### Pricing Tiers

| Tier | Price | Target | Features |
|------|-------|--------|----------|
| MVP | $5,000–$15,000 | Startups/POCs | Web app, basic automation, responsive design, 3-month support |
| Growth | $15,000–$30,000 | SMEs scaling | Full stack + mobile, ERP integration, 6-month support, CI/CD |
| Enterprise | $30,000+ | Corporations | Complete ecosystem, multi-platform, security audit, 12-month SLA |

### App.jsx Lazy Loading

```jsx
import { lazy, Suspense } from 'react';
const Methodology = lazy(() => import('./components/Methodology'));
const Contact = lazy(() => import('./components/Contact'));
// Wrap in: <Suspense fallback={<div className="animate-pulse h-96 bg-surface rounded-lg" />}>
```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Build | `pnpm build` succeeds | Run after each phase |
| Lint | `pnpm lint` 0 errors | Run after each phase |
| Visual | All 12 sections render at md/lg | Manual browser check per phase |
| Motion | `prefers-reduced-motion` skips animations | Browser devTools toggle |
| API | Contact POST sends correct payload | Network tab / curl verification |

## Migration / Rollout

Phased via chained PRs (proposal §Delivery Strategy). No data migration. Backend `sector` stored in `message` field — no model change needed.

## Open Questions

- [ ] Should `sector` be added as a real `Lead` model field or remain prepended to `message`? (Backend team coordination)
- [ ] Hero sphere + circuit map CSS: keep as custom CSS in index.css or attempt Tailwind utilities? (Complex gradients/z-index favor custom CSS)

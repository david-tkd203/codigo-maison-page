# Proposal: Frontend Complete Overhaul

## Intent

Replace the current inline-CSS architecture (~1,700 lines of `<style>` blocks across 13 components) with Tailwind CSS v4 utility classes and `motion@12.40.0` declarative animations. Fix content/business issues (orphaned Pricing in UF currency, Contact form backend mismatch, missing SEO/OG tags). Remove dead code (FuturisticStyles.jsx 464 lines, unused hooks, scaffolding assets).

## Scope

### In Scope
- Migrate ALL inline `<style>` blocks to Tailwind v4 utilities + `@theme` tokens
- Remove `FuturisticStyles.jsx` (464 lines), distribute effects to Tailwind/custom CSS
- Install `motion@^12.40.0`, replace `useScrollReveal` hook with `whileInView`
- Redesign `Pricing.jsx` as "Planes y Presupuestos" in USD with real Código Maison services
- Wire `Pricing.jsx` into `App.jsx` (currently orphaned)
- Apply `useTextScramble` to Hero tagline
- Fix `Contact.jsx`: align `project_type` values with backend `PROJECT_TYPES`, send `sector` to API, collect `email` and `whatsapp` fields
- Fix `index.html`: lang="es", proper `<title>`, OG/SEO meta tags
- Lazy-load below-fold sections (`React.lazy` + `Suspense`)
- `prefers-reduced-motion` support across all animations
- Remove unused scaffolding assets (`src/assets/vite.svg`, `react.svg`)
- Remove `react-doctor` from `devDependencies`
- Fix 4 pre-existing lint errors in hooks

### Out of Scope
- Backend changes (models, serializers, views)
- New sections or page structure
- Routing library introduction
- Dark mode
- i18n / multi-language
- Testing infrastructure

## Capabilities

### New Capabilities
- `tailwind-v4-migration`: Replace inline CSS with Tailwind v4 utilities and `@theme` tokens
- `motion-animations`: Declarative scroll-reveal and page-transition animations via `motion@12.40.0`
- `pricing-section`: "Planes y Presupuestos" section with real service descriptions in USD
- `seo-foundation`: `index.html` meta tags, OG, lang, title

### Modified Capabilities
- `contact-form`: Fix `project_type` value alignment, add `sector` to payload, collect `email`/`whatsapp` fields

## Architecture Change

**From**: Inline `<style>` blocks per component + CSS custom properties in `index.css` + `FuturisticStyles.jsx` for global decorative styles + `IntersectionObserver` hook for scroll reveals.

**To**: Tailwind v4 (`@tailwindcss/vite` plugin) with `@theme` tokens for brand colors/fonts/spacing/shadows. Minimal `index.css` for custom keyframes and canvas-based `ElectricParticles`. `motion/react` `whileInView` for scroll reveals and `AnimatePresence` for staggered children. Tailwind breakpoints (`md:`, `lg:`) replace manual `@media` queries.

## Component Inventory

| Component | Lines | Fate | Notes |
|-----------|-------|------|-------|
| `FuturisticStyles.jsx` | 464 | **Remove** | Effects → Tailwind + index.css |
| `Hero.jsx` | ~150 | **Refactor** | Tailwind + useTextScramble on tagline |
| `About.jsx` | ~130 | **Refactor** | Tailwind + motion animations |
| `ValueProposition.jsx` | ~160 | **Refactor** | Tailwind + motion animations |
| `Expertise.jsx` | ~180 | **Refactor** | Tailwind + motion animations |
| `Solutions.jsx` | ~210 | **Refactor** | Tailwind + motion animations |
| `Products.jsx` | ~180 | **Refactor** | Tailwind + motion animations |
| `Methodology.jsx` | ~170 | **Refactor** | Tailwind + motion animations |
| `Contact.jsx` | 238 | **Refactor** | Tailwind + fix payload + add fields |
| `Pricing.jsx` | 274 | **Redesign** | USD, real services, add to App |
| `Navbar.jsx` | ~80 | **Refactor** | Tailwind |
| `Footer.jsx` | ~80 | **Refactor** | Tailwind |
| `ElectricParticles.jsx` | ~120 | **Keep** | Canvas-based, needs custom CSS only |
| `index.css` | 103 | **Rewrite** | Tailwind directives + `@theme` + custom keyframes |
| `App.css` | 1 | **Remove** | Merged into index.css |
| `useScrollReveal.js` | 25 | **Remove** | Replaced by motion `whileInView` |
| `useTextScramble.js` | 43 | **Wire** | Already exists, apply to Hero |
| `useAnimeLogo.js` | -- | **Keep** | logo animation logic |

## Phase Breakdown

### Phase 1: Foundation
- Install deps: `tailwindcss@^4.3.0`, `@tailwindcss/vite@^4.3.0`, `motion@^12.40.0`
- Update `vite.config.js`: add `@tailwindcss/vite` plugin
- Bump versions: `vite@8.0.14`, `@vitejs/plugin-react@6.0.2`, `eslint@10.4.0`
- Remove: `react-doctor`
- Rewrite `index.css`: `@import "tailwindcss"`, `@theme` block with brand tokens, minimal custom keyframes
- Remove `App.css`
- Migrate ALL inline `<style>` blocks to Tailwind utilities (all 10 main components)
- Remove `FuturisticStyles.jsx` from `App.jsx` and filesystem
- Fix `index.html`: lang="es", title="Código Maison — Desarrollo de Software", OG tags, favicon
- Remove unused assets: `vite.svg`, `react.svg`
- Fix pre-existing lint errors in `useAnimeLogo.js`, `useTextScramble.js`

### Phase 2: Enhancement
- Replace `useScrollReveal` with `motion.div` + `whileInView` in all section components
- Add `AnimatePresence` for staggered child animations in grids
- Redesign `Pricing.jsx`: 3-4 service tiers (MVP, Growth, Enterprise) in USD with Código Maison service descriptions
- Wire Pricing into `App.jsx` between Products and Methodology
- Apply `useTextScramble` to Hero tagline element

### Phase 3: Polish
- Fix `Contact.jsx` payload: align `project_type` values to `PROJECT_TYPES` (logistica/restaurante/salud/otro), send `sector` field, add `email` and `whatsapp` input fields
- Add lazy loading for below-fold sections (`React.lazy`)
- Add `prefers-reduced-motion` media query disabling all animations
- Verify `pnpm build` succeeds with no new lint errors
- Verify `pnpm lint` passes (0 errors, excluding confirmed pre-existing 4 that we fix in Phase 1)

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Tailwind class sprawl makes diffs hard to review | Medium | Phase components into separate commits; use chained PRs |
| `FuturisticStyles.jsx` pointermove effects lost in migration | Low | Re-implement via `onPointerMove` or CSS `:hover` gradients |
| Backend rejects Contact payload after fixes | Low | `project_type` choices match backend; `sector` added as extra field or migrate DB |
| `motion` bundles increase page weight | Low | Tree-shaking via ES imports; lazy-load sections |

## Rollback Plan

Revert the `frontend-complete-overhaul` branch. Each phase is committed separately, enabling partial rollback. Dep changes (Phase 1) can be reverted with `pnpm install` after `git revert`.

## Dependencies

- Tailwind v4 plugin requires Vite ≥6 (we have v8)
- `motion@12.40.0` compatible with React 19
- Backend `sector` field: must add `sector` to `Lead` model or store in `message` (coordinate with backend team)

## Delivery Strategy

**Feature Branch Chain**: `feat/frontend-overhaul` (parent), with PR slices per phase:
- PR #1: Phase 1 → Foundation (deps, CSS migration, cleanup)
- PR #2: Phase 2 → Enhancement (motion animations, Pricing redesign)
- PR #3: Phase 3 → Polish (Contact fix, SEO, lazy loading)

Each PR targets the previous to keep diffs under 400 lines.

## Success Criteria

- [ ] `pnpm lint` passes with 0 errors
- [ ] `pnpm build` succeeds
- [ ] All 12 sections render correctly at desktop + mobile breakpoints
- [ ] Contact form sends correct `project_type` values and `sector` field
- [ ] Pricing section shows USD service tiers linked from App.jsx
- [ ] Hero tagline animates via text scramble
- [ ] Scroll-reveal animations work for ALL elements in each grid
- [ ] `prefers-reduced-motion` disables animations
- [ ] Zero inline `<style>` blocks remain (excepting canvas-dependent ElectricParticles)
- [ ] index.html shows correct lang, title, OG tags

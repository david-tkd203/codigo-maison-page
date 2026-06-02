# Tailwind v4 Migration Specification

## Purpose

Replace the current inline-CSS architecture (~1,700 lines of `<style>` blocks across 13 components plus 464 lines in `FuturisticStyles.jsx`) with Tailwind CSS v4 utility classes and `@theme` tokens. Remove dead CSS files, unused assets, and fix `index.html` metadata.

## Requirements

### Requirement: Dependency Installation

The system MUST install `tailwindcss@^4.3.0` and `@tailwindcss/vite@^4.3.0` as `devDependencies`. The system MUST remove `react-doctor` from `devDependencies`. The system MAY bump `vite` and `@vitejs/plugin-react` to latest compatible patch versions.

#### Scenario: Post-install build

- GIVEN the dependency changes are applied
- WHEN `pnpm install` completes and `pnpm build` runs
- THEN the build succeeds with no unresolved module errors

### Requirement: Vite Plugin Configuration

The system MUST add the `@tailwindcss/vite` plugin to `vite.config.js` plugins array before the React plugin. The system MUST remove any PostCSS or legacy Tailwind configuration references.

#### Scenario: Dev server start

- GIVEN `vite.config.js` includes `tailwindcss()` in the plugins array
- WHEN `pnpm dev` runs
- THEN Tailwind classes are generated on demand without a separate `tailwind.config.js`

### Requirement: index.css Rewrite with @theme Tokens

The system MUST rewrite `src/index.css` to:
1. `@import "tailwindcss"` as the first line
2. Define an `@theme` block containing brand tokens mapped to Tailwind v4 CSS custom properties:
   - Colors: `--color-electric: #00CFFF`, `--color-oil: #072B3A`, `--color-cyan-glow: #6FFBFF`, `--color-bg: #FFFFFF`, `--color-surface: #F8FAFC`, `--color-text: #1a2e3f`, `--color-text-light: #5a6e7e`, `--color-border-soft: rgba(7,43,58,0.08)`
   - Fonts: `--font-display: 'Space Grotesk', 'Inter', sans-serif`, `--font-body: 'Satoshi', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`, `--font-tech: 'Orbitron', 'Space Grotesk', monospace`
   - Radius: `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-lg: 16px`, `--radius-xl: 24px`
   - Shadows: `--shadow-sm: 0 1px 3px rgba(7,43,58,0.06)`, `--shadow-md: 0 4px 16px rgba(7,43,58,0.08)`, `--shadow-lg: 0 12px 40px rgba(7,43,58,0.1)`, `--shadow-glow: 0 0 24px rgba(0,207,255,0.25)`
3. Keep Google Fonts `@import` URLs for `Space Grotesk`, `Orbitron`, and `Satoshi`
4. Retain global resets (`box-sizing`, `scroll-behavior`, `font-smoothing`)
5. Keep the `.container` utility but express it as Tailwind-compatible classes where possible
6. Keep essential keyframes that cannot be expressed as Tailwind utilities: `hero-grid-drift`, `hero-scan`, `badge-ping`, `card-glint`, `ring-spin`, `ring-spin-reverse`, `platform-spin`, `toast-in`

#### Scenario: Theme tokens available

- GIVEN the `@theme` block is present in `index.css`
- WHEN a component uses `className="bg-electric text-oil font-tech shadow-lg"`
- THEN the compiled CSS resolves to the correct brand values

#### Scenario: No tailwind.config.js needed

- GIVEN the project has no `tailwind.config.js`
- WHEN `pnpm build` runs
- THEN the build completes successfully using the v4 plugin's built-in config resolution

### Requirement: Inline Style Block Removal

The system MUST remove ALL inline `<style>{`...`}</style>` blocks from every component file. Decorative and layout styles previously defined inline MUST be replaced with Tailwind utility classes or, for complex multi-property patterns that would cause excessive class sprawl, with component-scoped CSS classes defined in `index.css`. Each component file MUST contain zero inline `<style>` blocks after migration (with the sole exception of `ElectricParticles.jsx` if its canvas-dependent styles are unavoidable).

#### Scenario: Component audit passes

- GIVEN a script greps for `<style>` in `src/components/*.jsx`
- WHEN the migration is complete
- THEN the only match is optionally `ElectricParticles.jsx`

### Requirement: App.css Removal

The system MUST delete `src/App.css` and remove its import from `src/App.jsx`.

#### Scenario: App.jsx imports

- GIVEN `src/App.jsx`
- WHEN it is inspected after migration
- THEN `import './App.css'` is absent

### Requirement: FuturisticStyles.jsx Removal

The system MUST remove `src/components/FuturisticStyles.jsx` from the filesystem and remove its usage from `src/App.jsx`. The visual effects it provided (card pointermove gradients, navbar scrolled states, section decorative backgrounds, footer styling) MUST be re-implemented using Tailwind utilities and/or global CSS in `index.css`.

#### Scenario: Card hover effects preserved

- GIVEN a visitor hovers over a `.vp-card`
- WHEN the pointer moves
- THEN the card shows an electric border glow and subtle lift via Tailwind `hover:` utilities or CSS `:hover` in `index.css`

### Requirement: Asset Cleanup

The system MUST delete `src/assets/vite.svg` and `src/assets/react.svg` if they exist and are unreferenced.

### Requirement: index.html Metadata Fix

The system MUST rewrite `index.html` to:
- Set `<html lang="es">`
- Set `<title>Código Maison — Desarrollo de Software a Medida</title>`
- Add `<meta name="description" content="Código Maison diseña ecosistemas tecnológicos a medida para empresas argentinas. Software, mobile, ERP, automatización y ciberseguridad.">`
- Add Open Graph tags (see `seo-foundation` spec for full OG set)
- Keep or replace favicon with a valid path referencing existing logo assets

#### Scenario: Lighthouse SEO audit

- GIVEN the updated `index.html`
- WHEN a Lighthouse audit runs
- THEN the "Document does not have a valid lang attribute" and "Missing meta description" warnings are resolved

### Requirement: Component-by-Component Tailwind Refactor

For each component, the inline CSS classes MUST be replaced with Tailwind utilities using the `@theme` tokens. Representative mappings:

| Component | Key Tailwind Patterns |
|-----------|----------------------|
| `Navbar.jsx` | `fixed top-0 w-full z-50 bg-white/74 backdrop-blur-[18px] border-b border-electric/12` |
| `Hero.jsx` | `min-h-screen flex items-center relative overflow-hidden pt-[92px] bg-[radial-gradient(...)]` (keep complex hero gradient as inline style or custom `.hero` class in index.css) |
| `About.jsx` | `grid md:grid-cols-3 gap-7` for cards; cards use `bg-white rounded-lg border border-border-soft p-10` |
| `ValueProposition.jsx` | `grid md:grid-cols-3 gap-7`; cards use `bg-white rounded-lg border border-border-soft p-10 relative overflow-hidden` |
| `Expertise.jsx` | `grid md:grid-cols-2 lg:grid-cols-4 gap-4`; items use `bg-white rounded-[22px] border border-border-soft p-6` |
| `Solutions.jsx` | `grid md:grid-cols-2 lg:grid-cols-3 gap-7`; cards use `bg-white rounded-lg border border-border-soft p-8` |
| `Products.jsx` | `grid md:grid-cols-2 gap-7`; cards use `bg-white rounded-[32px] border border-border-soft p-10` |
| `Methodology.jsx` | `grid md:grid-cols-4 gap-6`; steps use `bg-white rounded-lg border border-border-soft p-8` |
| `Contact.jsx` | `grid lg:grid-cols-[1fr_1.3fr] gap-15`; form uses `bg-surface rounded-xl border border-border-soft p-10` |
| `Pricing.jsx` | `grid md:grid-cols-3 gap-7`; cards use `bg-white rounded-lg border border-border-soft p-9` |
| `Footer.jsx` | `bg-white border-t border-electric/16 pt-16 pb-8` |

Note: Hover effects that previously used `transform: translateY(-6px)` MUST become `hover:-translate-y-1.5 transition-all duration-400`. Glow borders MUST become `hover:border-electric/30 hover:shadow-glow`. Backdrop-filter cards MUST keep `backdrop-blur-[18px]` where needed.

#### Scenario: Mobile responsive layout

- GIVEN a viewport width of 390px
- WHEN the page renders
- THEN all grids collapse to a single column via `max-md:grid-cols-1`

#### Scenario: Zero inline style blocks

- GIVEN any refactored component file
- WHEN searched for `<style>`
- THEN zero matches are found

## Acceptance Criteria

- [ ] `pnpm install` includes `tailwindcss@^4.3.0` and `@tailwindcss/vite@^4.3.0`
- [ ] `vite.config.js` contains `@tailwindcss/vite` plugin
- [ ] `src/index.css` contains `@import "tailwindcss"` and `@theme` with all brand tokens
- [ ] `src/App.css` is deleted and not imported
- [ ] `src/components/FuturisticStyles.jsx` is deleted and not imported
- [ ] No component contains an inline `<style>` block (except `ElectricParticles.jsx` if justified)
- [ ] `src/assets/vite.svg` and `react.svg` are removed
- [ ] `react-doctor` is removed from `devDependencies`
- [ ] `index.html` has `lang="es"`, proper title, and meta description
- [ ] `pnpm build` succeeds
- [ ] `pnpm lint` passes with 0 errors

## Files Affected

| File | Change |
|------|--------|
| `package.json` | Add tailwind deps, remove react-doctor |
| `vite.config.js` | Add `@tailwindcss/vite` plugin |
| `src/index.css` | Rewrite with `@import "tailwindcss"`, `@theme`, keyframes |
| `src/App.css` | Delete |
| `src/App.jsx` | Remove `FuturisticStyles` and `App.css` imports; add `Pricing` import and render |
| `src/components/FuturisticStyles.jsx` | Delete |
| `src/components/Navbar.jsx` | Refactor inline styles to Tailwind |
| `src/components/Hero.jsx` | Refactor inline styles to Tailwind / custom `.hero` class |
| `src/components/About.jsx` | Refactor inline styles to Tailwind |
| `src/components/ValueProposition.jsx` | Refactor inline styles to Tailwind |
| `src/components/Expertise.jsx` | Refactor inline styles to Tailwind |
| `src/components/Solutions.jsx` | Refactor inline styles to Tailwind |
| `src/components/Products.jsx` | Refactor inline styles to Tailwind |
| `src/components/Methodology.jsx` | Refactor inline styles to Tailwind |
| `src/components/Contact.jsx` | Refactor inline styles to Tailwind |
| `src/components/Pricing.jsx` | Refactor inline styles to Tailwind (full redesign) |
| `src/components/Footer.jsx` | Refactor inline styles to Tailwind |
| `index.html` | Fix lang, title, meta description |
| `src/assets/vite.svg` | Delete |
| `src/assets/react.svg` | Delete |

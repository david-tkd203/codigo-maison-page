# Tasks: Frontend Complete Overhaul

## Phase 1: Foundation

- [x] 1.1 Update package.json (add tailwindcss, @tailwindcss/vite, motion; remove react-doctor; bump vite, @vitejs/plugin-react, eslint; rename to codigo-maison)
- [x] 1.2 Run pnpm install (successful - 22 packages added, 76 removed)
- [x] 1.3 Add @tailwindcss/vite to vite.config.js (tailwindcss() before react())
- [x] 1.4 Rewrite src/index.css (@import "tailwindcss", @theme block, custom keyframes, section-grid-bg, card-glow, Hero classes)
- [x] 1.5 Delete App.css and remove import from App.jsx
- [x] 1.6 Remove FuturisticStyles.jsx (deleted file, removed import and usage from App.jsx)
- [x] 1.7 Fix index.html (lang=es, title, meta description, OG tags, Twitter Card, canonical, JSON-LD, favicon)
- [x] 1.8 Delete unused assets (vite.svg, react.svg)
- [x] 1.9 Navbar.jsx - remove <style> block, use Tailwind classes
- [x] 1.10 Hero.jsx - remove <style> block, use Tailwind + custom classes from index.css
- [x] 1.11 About.jsx - remove <style> block, use Tailwind classes
- [x] 1.12 ValueProposition.jsx - remove <style> block, use Tailwind classes
- [x] 1.13 Expertise.jsx - remove <style> block, use Tailwind classes
- [x] 1.14 Solutions.jsx - remove <style> block, use Tailwind classes
- [x] 1.15 Products.jsx - remove <style> block, use Tailwind classes
- [x] 1.16 Methodology.jsx - remove <style> block, use Tailwind classes
- [x] 1.17 Contact.jsx - remove <style> block, use Tailwind classes
- [x] 1.18 Footer.jsx - remove <style> block, use Tailwind classes
- [x] 1.19 ElectricParticles.jsx - verified no <style> block (uses inline style prop, acceptable)
- [x] 1.20 Fix pre-existing lint errors in hooks (verified: zero lint errors after migration)
- [x] Generate public/favicon.svg (CM brand icon with electric blue #00CFFF on oil #072B3A)
- [x] Generate public/preview-hero.png (120x63px placeholder gradient from oil to electric - replace with full-res asset before deployment)

## Phase 2: Enhancement

- [x] 2.1 Create src/lib/animations.js with sectionVariants, containerVariants, itemVariants, useAccessibleAnimation
- [x] 2.2 Replace useScrollReveal with motion.div + whileInView in all 8 section components (About, VP, Expertise, Solutions, Products, Methodology, Contact, Footer)
- [x] 2.3 Add staggered grid animations via containerVariants/itemVariants in VP, Expertise, Solutions, Products, Methodology
- [x] 2.4 Add motion stagger to Hero content reveal (replaced animejs timeline with motion containerVariants/itemVariants)
- [x] 2.5 Delete useScrollReveal.js (no remaining imports)
- [x] 2.6 Wire useTextScramble to Hero tagline (ref on h1, delay: 600, duration: 2000)
- [x] 2.7 Redesign Pricing.jsx (3 USD tiers: MVP $4,000, Growth $8,000, Enterprise 'A medida')
- [x] 2.8 Wire Pricing into App.jsx between Products and Methodology
- [x] 2.9 Add AnimatePresence to Navbar (mobile menu + overlay) and Contact (toast)
- [x] 2.10 Verify build and lint (both pass: lint 0 errors, build 649ms)

## Phase 3: Polish

- [x] 3.1 Fix Contact.jsx form fields and payload
  - Added email/whatsapp input fields after sector/projectType row
  - Fixed project_type select options to match backend (logistica, restaurante, salud, otro)
  - Updated initial state with email, whatsapp
  - Fixed handleSubmit payload to include sector, email, whatsapp
  - Added email regex validation before fetch
  - Added role="status" / role="alert" to toast
- [x] 3.2 Add sector field to Django Lead model
  - Added SECTOR_CHOICES and sector CharField to backend/leads/models.py
  - Added 'sector' to backend/leads/serializers.py fields list
  - Generated leads/migrations/0002_lead_sector.py (apply via Docker: docker compose run --rm web python manage.py migrate)
- [x] 3.3 Toast visual states — already done in Phase 2, added role attributes
- [x] 3.4 Add React.lazy + Suspense for below-fold sections (Methodology, Contact)
- [x] 3.5 Wrap About.jsx and ValueProposition.jsx with React.memo
- [x] 3.6 Add loading="lazy" to Footer brand img (Navbar already had loading="eager")
- [x] 3.7 SEO already done in Phase 1 — verified index.html has OG, Twitter, canonical, JSON-LD
- [x] 3.8 Final verification: pnpm lint = 0 errors, pnpm build = 523ms (483 modules, lazy chunks verified)

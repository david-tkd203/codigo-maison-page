# Motion Animations Specification

## Purpose

Replace the imperative `useScrollReveal` hook (`IntersectionObserver` + `.reveal` / `.visible` classes) with declarative animations using `motion@12.40.0` (`motion/react`). Provide scroll-triggered reveals, staggered grid entrances, and `prefers-reduced-motion` support across all section components.

## Requirements

### Requirement: motion Dependency

The system MUST install `motion@^12.40.0`. All animation imports MUST use `'motion/react'` (NOT `'framer-motion'`). The system MUST remove `useScrollReveal.js` from `src/hooks/` and remove its imports from all components.

#### Scenario: Import verification

- GIVEN `src/components/About.jsx`
- WHEN the file is opened after migration
- THEN `import { useScrollReveal } from '../hooks/useScrollReveal'` is absent
- AND `import { motion } from 'motion/react'` is present

### Requirement: Scroll-Reveal with whileInView

Every section component that previously used `useScrollReveal()` MUST wrap its primary content container in `<motion.div>` with `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.15 }}`, and `transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}`.

Components affected: `About`, `ValueProposition`, `Expertise`, `Solutions`, `Products`, `Methodology`, `Contact`, `Pricing`.

#### Scenario: Section scrolls into viewport

- GIVEN a visitor scrolls down to the About section
- WHEN the section crosses the 15% visibility threshold
- THEN the section content fades in and translates from `y: 40` to `y: 0` over 700ms

#### Scenario: Section already in viewport on load

- GIVEN a visitor loads the page at a scroll position where About is visible
- WHEN the component mounts
- THEN the animation triggers immediately without requiring an additional scroll event

### Requirement: Staggered Grid Children

Grid containers in `ValueProposition`, `Expertise`, `Solutions`, `Products`, `Methodology`, and `Pricing` MUST use `motion.div` with `variants` to stagger child entrances. The parent container MUST define:

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.18 }
  }
};
```

Each child card/item MUST be a `<motion.div>` with:

```jsx
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};
```

#### Scenario: Grid renders on scroll

- GIVEN the Solutions section has 6 cards
- WHEN the section enters the viewport
- THEN cards appear sequentially with a 120ms stagger delay

#### Scenario: Rapid scroll past section

- GIVEN a visitor scrolls quickly past a section
- WHEN the section is only briefly visible
- THEN `viewport={{ once: true }}` ensures the animation runs at most once and does not reset

### Requirement: Hero Staggered Entrance

The `Hero.jsx` content items (badge, title, subtitle, buttons, signal cards) MUST be wrapped in a single `<motion.div>` parent with `staggerChildren: 0.12` and `delayChildren: 0.18`. Each child MUST use `motion.div` with `variants` for `opacity: [0,1]` and `y: [28,0]`. The existing `animejs` timeline for content reveal MUST be removed.

#### Scenario: Hero loads

- GIVEN the page loads at the top
- WHEN Hero mounts
- THEN the badge appears first, followed by title, subtitle, buttons, and signals in a staggered sequence

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN Hero mounts
- THEN all hero content appears instantly without stagger delays

### Requirement: AnimatePresence for Conditional UI

The system MUST wrap conditional UI elements (toast notifications in `Contact.jsx`, mobile menu in `Navbar.jsx`) in `<AnimatePresence mode="wait">`. Exit animations MUST use `exit={{ opacity: 0, y: 10 }}` with `transition={{ duration: 0.3 }}`.

#### Scenario: Toast dismissal

- GIVEN a success toast is visible in Contact
- WHEN it auto-dismisses after 4000ms
- THEN it fades out and slides down over 300ms before unmounting

#### Scenario: Mobile menu close

- GIVEN the mobile menu is open in Navbar
- WHEN the hamburger is clicked to close
- THEN the menu slides out with an exit animation instead of disappearing instantly

### Requirement: prefers-reduced-motion Support

The system MUST use the `useReducedMotion` hook from `motion/react` to disable all motion animations when the user prefers reduced motion. When `useReducedMotion()` returns `true`, all `motion.div` components MUST receive `animate={{ opacity: 1, y: 0 }}` immediately (or bypass animation logic entirely). This SHOULD be implemented via a shared wrapper component or a reusable hook that returns `{ initial: false, animate: { opacity: 1, y: 0 } }` when reduced motion is preferred.

#### Scenario: Reduced motion enabled

- GIVEN the OS/browser has `prefers-reduced-motion: reduce`
- WHEN any section enters the viewport
- THEN content appears instantly at full opacity and final position

#### Scenario: Reduced motion disabled

- GIVEN the OS/browser has no motion preference
- WHEN any section enters the viewport
- THEN standard scroll-reveal animations execute normally

### Requirement: useScrollReveal.js Removal

The file `src/hooks/useScrollReveal.js` MUST be deleted. The `.reveal` and `.visible` CSS classes in `src/index.css` MUST be removed.

#### Scenario: Hook file absent

- GIVEN `src/hooks/useScrollReveal.js`
- WHEN the file system is inspected after migration
- THEN the file does not exist

## Acceptance Criteria

- [ ] `motion@^12.40.0` is in `dependencies`
- [ ] All imports use `'motion/react'`
- [ ] `useScrollReveal.js` is deleted
- [ ] `.reveal` and `.visible` classes are removed from `index.css`
- [ ] Every section uses `<motion.div>` with `whileInView` for scroll reveal
- [ ] Grid sections use `variants` with `staggerChildren` for card/item entrances
- [ ] Hero uses motion variants instead of animejs timeline for content reveal
- [ ] `AnimatePresence` wraps toast and mobile menu conditional rendering
- [ ] `useReducedMotion` disables all animations when preferred
- [ ] `pnpm lint` passes with 0 errors

## Files Affected

| File | Change |
|------|--------|
| `package.json` | Add `motion@^12.40.0` to dependencies |
| `src/hooks/useScrollReveal.js` | Delete |
| `src/index.css` | Remove `.reveal` / `.visible` classes |
| `src/components/Hero.jsx` | Remove animejs timeline; add motion stagger variants |
| `src/components/About.jsx` | Replace `useScrollReveal` with `motion.div` |
| `src/components/ValueProposition.jsx` | Replace `useScrollReveal`; add stagger variants |
| `src/components/Expertise.jsx` | Replace `useScrollReveal`; add stagger variants |
| `src/components/Solutions.jsx` | Replace `useScrollReveal`; add stagger variants |
| `src/components/Products.jsx` | Replace `useScrollReveal`; add stagger variants |
| `src/components/Methodology.jsx` | Replace `useScrollReveal`; add stagger variants |
| `src/components/Pricing.jsx` | Replace `useScrollReveal`; add stagger variants |
| `src/components/Contact.jsx` | Replace `useScrollReveal`; add `AnimatePresence` for toast |
| `src/components/Navbar.jsx` | Add `AnimatePresence` for mobile menu |

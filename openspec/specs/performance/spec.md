# Performance Specification

## Purpose

Reduce initial bundle size and improve Core Web Vitals by lazy-loading below-fold sections, adding image lazy loading, and memoizing static components.

## Requirements

### Requirement: Lazy-Load Below-Fold Sections

The system MUST lazy-load `Methodology` and `Contact` sections using `React.lazy` and `Suspense`. The `Suspense` fallback MUST be a minimal placeholder `div` with `className="min-h-[400px]"` to prevent layout shift. The imports in `App.jsx` MUST use dynamic imports:

```jsx
const Methodology = lazy(() => import('./components/Methodology'));
const Contact = lazy(() => import('./components/Contact'));
```

#### Scenario: Initial page load

- GIVEN a visitor loads the page
- WHEN the network trace is inspected
- THEN `Methodology` and `Contact` chunks are NOT fetched in the initial document request
- AND they load only when the user scrolls near them or the import is resolved by the browser

#### Scenario: Fast scroll to contact

- GIVEN a visitor clicks the "Contacto" nav link immediately on load
- WHEN the browser navigates to `#contact`
- THEN `Contact.jsx` begins loading dynamically
- AND the `Suspense` fallback is visible until the chunk resolves

#### Scenario: Chunk loading failure

- GIVEN a network interruption blocks the lazy chunk
- WHEN the dynamic import rejects
- THEN the error is caught by a boundary (if present) or the section remains blank; no uncaught promise rejection crashes the app

### Requirement: Image Lazy Loading

The system MUST add `loading="lazy"` to all `<img>` tags in the application. If any images are above the fold (e.g., logo in Navbar), they MAY use `loading="eager"` instead.

#### Scenario: Image below fold

- GIVEN an `<img>` inside `Products.jsx` or `About.jsx`
- WHEN the page loads
- THEN the image does NOT begin downloading until it approaches the viewport

#### Scenario: LCP image

- GIVEN the logo in `Navbar.jsx` is the largest contentful paint element
- WHEN the page loads
- THEN the logo uses `loading="eager"` to avoid lazy-loading the LCP element

### Requirement: React.memo for Static Components

The system MUST wrap `About` and `ValueProposition` component exports with `React.memo()`. These components receive no props and render static content, making them ideal candidates for memoization to prevent re-renders triggered by parent state changes (e.g., toast state in Contact or mobile menu state in Navbar).

#### Scenario: Contact form state changes

- GIVEN a user types in the Contact form
- WHEN `App` re-renders due to descendant state changes
- THEN `About` and `ValueProposition` do NOT re-render because their memoized outputs are unchanged

#### Scenario: Memoized component props change

- GIVEN `About` or `ValueProposition` later receives props
- WHEN props change
- THEN the component re-renders normally per `React.memo` shallow comparison

## Acceptance Criteria

- [ ] `App.jsx` uses `React.lazy` for `Methodology` and `Contact`
- [ ] `App.jsx` wraps lazy components in `<Suspense>` with a placeholder
- [ ] All `<img>` tags have `loading="lazy"` (or `eager` for above-fold)
- [ ] `About.jsx` export is wrapped in `React.memo`
- [ ] `ValueProposition.jsx` export is wrapped in `React.memo`
- [ ] `pnpm build` generates separate chunks for Methodology and Contact
- [ ] `pnpm lint` passes with 0 errors

## Files Affected

| File | Change |
|------|--------|
| `src/App.jsx` | Add `React.lazy`, `Suspense` for Methodology and Contact |
| `src/components/About.jsx` | Wrap export with `React.memo` |
| `src/components/ValueProposition.jsx` | Wrap export with `React.memo` |
| `src/components/Navbar.jsx` | Ensure logo img uses `loading="eager"` if applicable |
| Any component with `<img>` | Add `loading="lazy"` |

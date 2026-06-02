# SEO Foundation Specification

## Purpose

Fix `index.html` metadata to support Spanish language, proper page title, meta description, Open Graph tags, Twitter Card, favicon, and JSON-LD structured data. This establishes the minimum viable SEO foundation for the Código Maison landing page.

## Requirements

### Requirement: Language Attribute

The system MUST change `<html lang="en">` to `<html lang="es">` in `index.html`.

#### Scenario: Screen reader language

- GIVEN a visitor uses a screen reader
- WHEN the page loads
- THEN the reader pronounces content in Spanish

### Requirement: Title and Meta Description

The system MUST set `<title>Código Maison — Desarrollo de Software a Medida</title>`. The system MUST add `<meta name="description" content="Código Maison diseña ecosistemas tecnológicos a medida para empresas argentinas. Software, mobile, ERP, automatización y ciberseguridad.">`.

#### Scenario: Search engine indexing

- GIVEN a search engine crawler visits the site
- WHEN it parses the HTML head
- THEN it extracts the title and description for SERP display

### Requirement: Open Graph Tags

The system MUST add the following `<meta property="og:*">` tags inside `<head>`:
- `og:title`: `Código Maison — Desarrollo de Software a Medida`
- `og:description`: `Diseñamos ecosistemas tecnológicos a medida para empresas argentinas. Software, mobile, ERP, automatización y ciberseguridad.`
- `og:type`: `website`
- `og:url`: `https://codigomaison.com` (or current production domain)
- `og:image`: `/preview-hero.png`
- `og:image:width`: `1200`
- `og:image:height`: `630`
- `og:locale`: `es_AR`

#### Scenario: Social sharing

- GIVEN a user shares the URL on LinkedIn or WhatsApp
- WHEN the platform scrapes the page
- THEN a rich preview card appears with the title, description, and hero image

### Requirement: Twitter Card Tags

The system MUST add the following `<meta name="twitter:*">` tags:
- `twitter:card`: `summary_large_image`
- `twitter:title`: `Código Maison — Desarrollo de Software a Medida`
- `twitter:description`: `Diseñamos ecosistemas tecnológicos a medida para empresas argentinas.`
- `twitter:image`: `/preview-hero.png`

#### Scenario: Twitter/X sharing

- GIVEN a user posts the URL on X
- WHEN the card renders
- THEN it displays a large image card with the hero preview

### Requirement: Favicon

The system MUST ensure `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` points to an existing file, OR replace it with a valid favicon derived from existing logo assets. The system MAY add `apple-touch-icon` and `manifest` links if suitable assets exist.

#### Scenario: Browser tab icon

- GIVEN a visitor opens the site in Chrome
- WHEN the tab renders
- THEN the favicon appears in the tab bar

### Requirement: JSON-LD Structured Data

The system MUST inject a `<script type="application/ld+json">` block containing Organization structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Código Maison",
  "url": "https://codigomaison.com",
  "logo": "https://codigomaison.com/logo.svg",
  "description": "Desarrollo de software a medida, mobile, ERP, automatización y ciberseguridad para empresas argentinas.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Buenos Aires",
    "addressCountry": "AR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hola@codigomaison.com",
    "contactType": "Ventas",
    "availableLanguage": ["Spanish"]
  }
}
```

#### Scenario: Google Knowledge Panel

- GIVEN Google indexes the page
- WHEN it extracts structured data
- THEN the Organization entity is eligible for a Knowledge Panel

### Requirement: Canonical URL

The system MUST add `<link rel="canonical" href="https://codigomaison.com/" />`.

#### Scenario: Duplicate content prevention

- GIVEN the site is accessible with and without `www`
- WHEN search engines crawl both variants
- THEN the canonical tag consolidates ranking signals to a single URL

## Acceptance Criteria

- [ ] `index.html` has `<html lang="es">`
- [ ] `index.html` title is `Código Maison — Desarrollo de Software a Medida`
- [ ] Meta description is present and under 160 characters
- [ ] All 8 Open Graph meta tags are present
- [ ] All 4 Twitter Card meta tags are present
- [ ] Favicon link resolves to an existing asset
- [ ] JSON-LD Organization script is valid and inside `<head>`
- [ ] Canonical link is present
- [ ] `pnpm build` injects the tags correctly into `dist/index.html`

## Files Affected

| File | Change |
|------|--------|
| `index.html` | Add/modify lang, title, meta description, OG tags, Twitter tags, favicon, JSON-LD, canonical |
| `public/preview-hero.png` | Ensure exists (if not, create from existing hero assets or note as asset task) |
| `public/favicon.svg` | Ensure exists or generate from logo assets |

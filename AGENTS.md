# Código Maison — AGENTS.md

## Project

Landing page + backoffice for a software development company. Monorepo, no workspace tool.

- **Frontend**: `src/` — React 19, Vite 8, JSX (no TypeScript), Tailwind CSS 4, animejs, motion (Framer Motion).
- **Backend**: `backend/` — Django 5.2 + DRF, PostgreSQL (SQLite fallback), python-decouple.
- **Infra**: Docker Compose — Nginx (frontend) + Gunicorn (Django) + PostgreSQL 16.
- **Deploy**: Cloudflare Pages (`wrangler pages deploy`).
- **No CI, no tests exist anywhere.**

## Frontend

- **Package manager**: pnpm (not npm/yarn). Lockfile: `pnpm-lock.yaml`.
- **Dev**: `pnpm dev` (Vite, port 5173). Proxies `/api` → `localhost:8000`.
- **Build**: `pnpm build` → `dist/`. For Django to serve in dev, copy to `backend/frontend_dist/`.
- **Lint**: `pnpm lint` — ESLint 10 with flat config. Runs on all `**/*.{js,jsx}`.
  Pre-existing false positives from vendored libs in `dist/`, `node_modules/` — ignore `hljs`/`jQuery`/`$` undef errors.
- **API_URL**: Simply `'/api'` everywhere (Vite proxies in dev, same-origin in prod via Nginx). Do NOT hardcode `localhost:8000`.
- **No routing library** — single-page, anchor-section navigation via `App.jsx`.

### Component render order (in `App.jsx`)
```
<Pricing /> <Hero /> <ValueProposition /> <Expertise /> <Solutions />
<Methodology /> (lazy) <Contact /> (lazy)
```

| Component | Note |
|-----------|------|
| `Pricing.jsx` | **IS rendered** (not orphaned). Contains 8-feature grid + video + plans section. |
| `FuturisticStyles.jsx` | Global decorative styles outside `<main>`, not a section. |
| `ElectricParticles.jsx` | Animated canvas background inside Hero. |
| `Contact.jsx` | Sends `POST /api/leads/` with `name, company, sector, email, whatsapp, project_type, investment, message, consent`. |
| `Pricing.jsx` | Has its own SVG brand mark components (`BrandMark`, `IVABadge`). |

## Backend

- **Entry**: `backend/config/wsgi.py` (gunicorn), `backend/manage.py`.
- **Settings**: `python-decouple` reads `.env` (at repo root). Key vars:
  `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `ALLOWED_HOSTS`, `DATABASE_URL`, `CORS_ALLOWED_ORIGINS`, `ADMIN_URL`.
- **Dev server**: `cd backend && python manage.py runserver` (port 8000). Uses SQLite by default.
- **Build for prod**: `docker compose up --build` from repo root.
  Nginx serves the built SPA; proxies `/api/*` and `/gestion-codigomaison/*` → Django on `backend:8000`.
- **Locale**: `es-ar`, timezone `America/Argentina/Buenos_Aires`.

### Admin (hidden URL)

The Django admin is NOT at `/admin/` — that route returns 404.
- Actual URL: `/{ADMIN_URL}/` (default: `gestion-codigomaison`), set via `ADMIN_URL` in `.env`.
- Includes leads/visits management + signature generator at `/{ADMIN_URL}/firma/`.

### API

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/leads/` | POST | AllowAny | Contact form submissions. No CSRF, JSON-only. |
| `/api/track/` | POST | AllowAny | Anonymous page-visit tracking (from `useVisitorTracking` hook). |
| `/api/admin/stats/` | GET | IsAdminUser | Dashboard stats for backoffice. |

- DRF is **JSON-only** (`UNAUTHENTICATED_USER: None`, no Browsable API).

### Models

- `Lead` — contact form. Fields: `name, company, sector, whatsapp, email, project_type, investment, message, is_read`.
  Tracking auto-fields: `ip_address, user_agent, referrer, consent_given`. Order: `-created_at`.
- `Visit` — page visit. Fields: `page, ip_address, user_agent, referrer, country, region, city, consent_given`.

### Signature generator (`/{ADMIN_URL}/firma/`)

- Generates corporate email signatures as PNG.
- Download uses **server-side Pillow** (`Pillow` in `requirements.txt`).
- `Pillow` import is **conditional** inside `_generar_png()` — if missing, the admin still works, download returns 501.
- Logo: `public/images/logo-firma.png` (150×187, 26KB). Path resolved via `settings.BASE_DIR.parent`.
- `frontend_dist/` can be empty in Docker (Nginx serves SPA). SPA catch-all has graceful fallback.

### SPA catch-all

In `config/urls.py`: any non-API, non-admin request renders `index.html` from `frontend_dist/`.
If template is missing (empty dir), returns a minimal inline HTML page instead of 500.

## Production quirks

- `.dockerignore` excludes `.env`, `*.sqlite3`, `node_modules/`, `__pycache__/`.
- `backend/Dockerfile` creates `frontend_dist/` (empty) + runs `collectstatic`. Migrations + admin creation happen at container start.
- Cloudflare Pages deploy: `pnpm build && wrangler pages deploy --branch main`.
- Email templates: `emails/*.mjml` compiled via `pnpm build:emails` (mjml CLI).
- `Contact.jsx` sends empty strings for `whatsapp` (optional field in form). If required in the model, the form breaks silently.

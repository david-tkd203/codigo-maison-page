# Código Maison — AGENTS.md

## Project

Landing page for a software development company. Monorepo with two folders, no workspace tool.

- **Frontend**: `src/` — React 19, Vite 8, JSX (no TypeScript), animejs. Config at root.
- **Backend**: `backend/` — Django 5.2 + DRF, PostgreSQL (SQLite fallback).
- **Infra**: Docker Compose (Django + gunicorn + PostgreSQL 16), multi-stage Dockerfile.

## Frontend

- **Package manager**: pnpm (not npm/yarn). Lockfile: `pnpm-lock.yaml` at root.
- **Dev**: `pnpm dev` (Vite dev server, proxies `/api` → `localhost:8000`).
- **Build**: `pnpm build` → `dist/`.
- **Lint**: `pnpm lint` — ESLint 10 with flat config (`eslint.config.js`). Runs on all `**/*.{js,jsx}`.
- No routing library — single-page app with anchor sections, rendered by `App.jsx`.
- **Component flow** (in order): Hero → About → ValueProposition → Expertise → Solutions → Products → Methodology → Contact.
- `FuturisticStyles.jsx` renders global decorative styles outside `<main>` (no section).
- `ElectricParticles.jsx` is an animated canvas background used inside Hero.
- **Pre-existing lint errors**: 4 in `hooks/useAnimeLogo.js` and `hooks/useTextScramble.js` (unused imports/vars). All components pass lint clean.

## Backend

- **Entry**: `backend/config/wsgi.py` (gunicorn), `backend/manage.py`.
- **Settings**: `python-decouple` via env vars. Key vars (in `.env`):
  `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `ALLOWED_HOSTS`, `DATABASE_URL`, `CORS_ALLOWED_ORIGINS`.
- **Dev server**: `python manage.py runserver` (in `backend/` with venv + `requirements.txt`).
- **DRF config**: JSON-only (no Browsable API), `UNAUTHENTICATED_USER: None`, AllowAny on contact endpoint.
- **Only app**: `leads/` — single model `Lead` (contact form submissions). Admin at `/admin/`.
- **API**: `POST /api/leads/` — public, no auth, no CSRF. Accepts fields from the `Contact` form.
- **Locale**: `es-ar`, timezone `America/Argentina/Buenos_Aires`.
- **No tests** exist anywhere.

## Production

- **Docker**: `docker compose up --build` — runs both web (port 80→8000) and db (PostgreSQL).
- Django serves the built frontend: prebuilt `frontend_dist/` via SPA catch-all URL (`config/urls.py` re_path).
- Migrate + collectstatic happen at container start (`CMD` in Dockerfile).
- `.dockerignore` excludes `.env`, `*.sqlite3`, `node_modules/`, `__pycache__/`.

## No CI / No testing infrastructure exists.

## Quirks

- `Contact.jsx` sends empty strings for `whatsapp` and `email` (not collected by form). If these fields ever become required, the form will break silently.
- `Pricing.jsx` exists in components/ but is **not rendered** in `App.jsx` (orphaned component).

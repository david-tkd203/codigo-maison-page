# ============================================================
# Código Maison — Dockerfile (SPA estática con Nginx)
# ============================================================

# ---------- Variables de entorno para el build (EmailJS) ----------
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_TEAM
ARG VITE_EMAILJS_TEMPLATE_CLIENT

# ---------- Stage 1: Build frontend ----------
FROM node:24-alpine AS frontend-builder

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10 --activate

# Dependencias (cache layer)
COPY package.json pnpm-lock.yaml ./
RUN CI=true pnpm install --no-frozen-lockfile

# Código fuente
COPY vite.config.js eslint.config.js index.html ./
COPY src/ src/
COPY public/ public/

# Pasar args como env para que Vite los incruste en el bundle
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_TEAM
ARG VITE_EMAILJS_TEMPLATE_CLIENT
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY
ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID
ENV VITE_EMAILJS_TEMPLATE_TEAM=$VITE_EMAILJS_TEMPLATE_TEAM
ENV VITE_EMAILJS_TEMPLATE_CLIENT=$VITE_EMAILJS_TEMPLATE_CLIENT

# Build
RUN pnpm build

# ---------- Stage 2: Production con Nginx ----------
FROM nginx:1.27-alpine

# Copiar frontend compilado
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Copiar config de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

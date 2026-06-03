# ============================================================
# Código Maison — Dockerfile
# ============================================================

ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_TEAM
ARG VITE_EMAILJS_TEMPLATE_CLIENT

# ---- Stage 1: Build Frontend ----
FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY package.json pnpm-lock.yaml ./
RUN CI=true pnpm install --frozen-lockfile

COPY vite.config.js eslint.config.js index.html ./
COPY src/ src/
COPY public/ public/

ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_TEAM
ARG VITE_EMAILJS_TEMPLATE_CLIENT
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY
ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID
ENV VITE_EMAILJS_TEMPLATE_TEAM=$VITE_EMAILJS_TEMPLATE_TEAM
ENV VITE_EMAILJS_TEMPLATE_CLIENT=$VITE_EMAILJS_TEMPLATE_CLIENT

RUN pnpm build

# ---- Stage 2: Nginx ----
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

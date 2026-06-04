# ============================================================
# Código Maison — Frontend Dockerfile
# ============================================================

# ---- Stage 1: Build Frontend ----
FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY package.json pnpm-lock.yaml ./
RUN CI=true pnpm install --frozen-lockfile

COPY vite.config.js eslint.config.js index.html ./
COPY src/ src/
COPY public/ public/

RUN pnpm build

# ---- Stage 2: Nginx ----
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

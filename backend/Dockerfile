# ============================================================
# Código Maison — Backend Dockerfile
# ============================================================

FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema (incluye las que necesita Pillow)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc libpq-dev \
    libjpeg62-turbo-dev zlib1g-dev libwebp-dev libfreetype6-dev liblcms2-dev && \
    rm -rf /var/lib/apt/lists/*

# Instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copiar código
COPY . .

# Recopilar archivos estáticos
RUN mkdir -p frontend_dist staticfiles && \
    python manage.py collectstatic --noinput --clear 2>/dev/null || true

EXPOSE 8000

# Migrar, crear admin y arrancar
CMD python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput --clear 2>/dev/null; \
    python manage.py ensure_admin; \
    exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -

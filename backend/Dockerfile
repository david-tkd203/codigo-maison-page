# ============================================================
# Código Maison — Backend Dockerfile
# ============================================================

FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Recopilar archivos estáticos
RUN mkdir -p frontend_dist staticfiles && \
    python manage.py collectstatic --noinput --clear 2>/dev/null || true

EXPOSE 8000

# Migrar y arrancar
CMD python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput --clear 2>/dev/null; \
    exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -

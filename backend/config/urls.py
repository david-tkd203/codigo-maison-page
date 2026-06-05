from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.http import HttpResponseNotFound, HttpResponse
from django.template import engines
from decouple import config

# Ruta oculta del admin — configurable vía ADMIN_URL en .env
# Por defecto usa 'gestion-codigomaison' pero podés cambiarlo
ADMIN_PREFIX = config('ADMIN_URL', default='gestion-codigomaison')

urlpatterns = [
    path(f'{ADMIN_PREFIX}/firma/', include('leads.admin_urls')),
    path(f'{ADMIN_PREFIX}/', admin.site.urls),
    path('api/', include('leads.urls')),
]

# La ruta /admin/ tradicional devuelve 404 directamente
urlpatterns += [
    path('admin/', lambda r: HttpResponseNotFound('<h1>404 Not Found</h1>')),
]

# SPA catch-all: sirve index.html para cualquier ruta que no sea API ni admin
# Si no existe el template (frontend_dist vacío), devuelve 200 con mensaje simple
def _spa_fallback(request, **kwargs):
    try:
        # Intentar renderizar el template del frontend
        from django.shortcuts import render
        return render(request, 'index.html', {'frontend': True})
    except Exception:
        # Si no existe (ej: frontend_dist vacío), responder sin crashear
        return HttpResponse(
            '<!DOCTYPE html><html><head><title>Código Maison</title></head>'
            '<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;'
            'min-height:100vh;margin:0;background:#f8fafc;color:#072B3A;">'
            '<h1 style="font-size:1.5rem;">Código Maison</h1></body></html>'
        )

urlpatterns += [
    re_path(rf'^(?!api/|{ADMIN_PREFIX}/|admin/).*', _spa_fallback),
]

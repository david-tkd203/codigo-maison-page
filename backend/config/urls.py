from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.http import HttpResponseNotFound
from decouple import config

# Ruta oculta del admin — configurable vía ADMIN_URL en .env
# Por defecto usa 'gestion-codigomaison' pero podés cambiarlo
ADMIN_PREFIX = config('ADMIN_URL', default='gestion-codigomaison')

urlpatterns = [
    path(f'{ADMIN_PREFIX}/', admin.site.urls),
    path(f'{ADMIN_PREFIX}/firma/', include('leads.admin_urls')),
    path('api/', include('leads.urls')),
]

# La ruta /admin/ tradicional devuelve 404 directamente
urlpatterns += [
    path('admin/', lambda r: HttpResponseNotFound('<h1>404 Not Found</h1>')),
]

# SPA catch-all: sirve index.html para cualquier ruta que no sea API ni admin
urlpatterns += [
    re_path(rf'^(?!api/|{ADMIN_PREFIX}/|admin/).*', TemplateView.as_view(
        template_name='index.html',
        extra_context={'frontend': True},
    )),
]

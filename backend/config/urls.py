from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('leads.urls')),
]

# SPA catch-all: serve index.html for any non-API, non-admin route
urlpatterns += [
    re_path(r'^(?!api/|admin/).*', TemplateView.as_view(
        template_name='index.html',
        extra_context={'frontend': True},
    )),
]

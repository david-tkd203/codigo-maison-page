from django.contrib import admin
from .models import Lead, Visit


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'company', 'email', 'whatsapp', 'project_type',
        'created_at', 'is_read', 'ip_address', 'consent_given'
    ]
    list_filter = ['project_type', 'investment', 'is_read', 'created_at', 'consent_given', 'sector']
    search_fields = ['name', 'company', 'email', 'whatsapp', 'ip_address', 'message']
    readonly_fields = ['created_at', 'ip_address', 'user_agent', 'referrer', 'consent_given']
    list_editable = ['is_read']
    date_hierarchy = 'created_at'
    list_per_page = 25

    fieldsets = [
        ('Datos del Contacto', {
            'fields': ['name', 'company', 'email', 'whatsapp', 'sector'],
        }),
        ('Proyecto', {
            'fields': ['project_type', 'investment', 'message'],
        }),
        ('Estado', {
            'fields': ['is_read', 'created_at'],
        }),
        ('Tracking Completo', {
            'fields': ['ip_address', 'user_agent', 'referrer', 'consent_given'],
            'description': 'Dirección IP, navegador/dispositivo, página de origen y consentimiento de cookies.',
        }),
    ]


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = [
        'page', 'ip_address', 'country', 'city', 'region',
        'consent_given', 'visited_at', 'truncated_user_agent'
    ]
    list_filter = ['consent_given', 'visited_at', 'country', 'city', 'page']
    search_fields = ['page', 'ip_address', 'country', 'city', 'region', 'user_agent', 'referrer']
    readonly_fields = ['visited_at']
    date_hierarchy = 'visited_at'
    list_per_page = 50

    fieldsets = [
        ('Página Visitada', {
            'fields': ['page', 'referrer'],
        }),
        ('Datos del Visitante', {
            'fields': ['ip_address', 'user_agent', 'consent_given'],
        }),
        ('Ubicación Geográfica', {
            'fields': ['country', 'region', 'city'],
        }),
        ('Fecha', {
            'fields': ['visited_at'],
        }),
    ]

    def truncated_user_agent(self, obj):
        ua = obj.user_agent or ''
        return ua[:80] + '...' if len(ua) > 80 else ua
    truncated_user_agent.short_description = 'Navegador / Dispositivo'

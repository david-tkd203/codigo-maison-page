from django.contrib import admin
from .models import Lead, Visit


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'email', 'project_type', 'investment', 'created_at', 'is_read', 'ip_address']
    list_filter = ['project_type', 'investment', 'is_read', 'created_at']
    search_fields = ['name', 'company', 'email', 'whatsapp']
    readonly_fields = ['created_at', 'ip_address', 'user_agent', 'referrer']
    fieldsets = [
        ('Datos del contacto', {
            'fields': ['name', 'company', 'email', 'whatsapp', 'sector'],
        }),
        ('Proyecto', {
            'fields': ['project_type', 'investment', 'message'],
        }),
        ('Estado', {
            'fields': ['is_read', 'created_at'],
        }),
        ('Tracking', {
            'fields': ['ip_address', 'user_agent', 'referrer', 'consent_given'],
            'classes': ['collapse'],
        }),
    ]


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ['page', 'ip_address', 'country', 'city', 'consent_given', 'visited_at']
    list_filter = ['consent_given', 'visited_at', 'country']
    search_fields = ['page', 'ip_address', 'country']
    readonly_fields = ['visited_at']

from django.db import models


class Lead(models.Model):
    SECTOR_CHOICES = [
        ('logistica', 'Logística'),
        ('salud', 'Salud'),
        ('gastronomia', 'Gastronomía'),
        ('tecnologia', 'Tecnología'),
        ('otro', 'Otro'),
    ]
    PROJECT_TYPES = [
        ('logistica', 'Logistica'),
        ('restaurante', 'Restaurante'),
        ('salud', 'Salud'),
        ('otro', 'Otro'),
    ]
    INVESTMENT_RANGES = [
        ('menos-5k', 'Menos de $5,000 USD'),
        ('5k-15k', '$5,000 - $15,000 USD'),
        ('15k-30k', '$15,000 - $30,000 USD'),
        ('mas-30k', 'Mas de $30,000 USD'),
    ]

    name = models.CharField('Nombre del Representante', max_length=200)
    company = models.CharField('Empresa / Institucion', max_length=300)
    sector = models.CharField(
        'Sector Industrial', max_length=30,
        choices=SECTOR_CHOICES, blank=True, default='',
    )
    whatsapp = models.CharField('WhatsApp / Telefono', max_length=50, blank=True, default='')
    email = models.EmailField('Correo Corporativo')
    project_type = models.CharField(
        'Tipo de Proyecto', max_length=30,
        choices=PROJECT_TYPES, blank=True, default='',
    )
    investment = models.CharField(
        'Rango de Inversion', max_length=20,
        choices=INVESTMENT_RANGES, blank=True, default='',
    )
    message = models.TextField('Necesidad / Mensaje')
    created_at = models.DateTimeField('Fecha de contacto', auto_now_add=True)
    is_read = models.BooleanField('Leido', default=False)

    # Tracking
    ip_address = models.GenericIPAddressField('IP', blank=True, null=True)
    user_agent = models.TextField('User Agent', blank=True, default='')
    referrer = models.CharField('Referrer', max_length=500, blank=True, default='')
    consent_given = models.BooleanField('Consentimiento cookies', default=False)

    class Meta:
        verbose_name = 'Lead'
        verbose_name_plural = 'Leads'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.company}'


class Visit(models.Model):
    page = models.CharField('Pagina visitada', max_length=500)
    ip_address = models.GenericIPAddressField('IP', blank=True, null=True)
    user_agent = models.TextField('User Agent', blank=True, default='')
    referrer = models.CharField('Referrer', max_length=500, blank=True, default='')
    country = models.CharField('Pais', max_length=100, blank=True, default='')
    region = models.CharField('Region', max_length=200, blank=True, default='')
    city = models.CharField('Ciudad', max_length=200, blank=True, default='')
    consent_given = models.BooleanField('Consentimiento', default=False)
    visited_at = models.DateTimeField('Fecha de visita', auto_now_add=True)

    class Meta:
        verbose_name = 'Visita'
        verbose_name_plural = 'Visitas'
        ordering = ['-visited_at']

    def __str__(self):
        return f'{self.page} — {self.ip_address or "anon"}'

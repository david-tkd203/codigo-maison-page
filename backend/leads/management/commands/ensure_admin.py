from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from decouple import config


class Command(BaseCommand):
    help = 'Crea el superusuario admin si no existe'

    def handle(self, *args, **options):
        username = config('ADMIN_USER', default='admin')
        password = config('ADMIN_PASSWORD', default='Madison2026!')
        email = config('ADMIN_EMAIL', default='admin@codigomaison.com')

        if User.objects.filter(username=username).exists():
            self.stdout.write(f'Usuario "{username}" ya existe, actualizando contraseña...')
            u = User.objects.get(username=username)
            u.set_password(password)
            u.save()
        else:
            self.stdout.write(f'Creando superusuario "{username}"...')
            User.objects.create_superuser(username, email, password)

        self.stdout.write(self.style.SUCCESS(f'✅ Admin "{username}" listo'))

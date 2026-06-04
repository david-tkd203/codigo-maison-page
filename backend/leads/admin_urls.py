from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.urls import path


def capitalizar(texto):
    if not texto:
        return ''
    return ' '.join(p.capitalize() for p in texto.strip().split())


@staff_member_required
def firma_view(request):
    context = {}

    nombres = request.GET.get('nombres', '').strip()
    apellidos = request.GET.get('apellidos', '').strip()
    cargo = request.GET.get('cargo', '').strip()
    telefono = request.GET.get('telefono', '').strip()
    correo = request.GET.get('correo', '').strip()

    if nombres or apellidos:
        context['nombres'] = capitalizar(nombres)
        context['apellidos'] = capitalizar(apellidos)
        context['cargo'] = capitalizar(cargo) if cargo else ''
        context['telefono'] = telefono
        context['correo'] = correo.lower() if correo else ''

    return render(request, 'leads/firma.html', context)


urlpatterns = [
    path('', firma_view, name='generar-firma'),
]

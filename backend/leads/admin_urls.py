import io
import os

from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponse
from django.shortcuts import render
from django.urls import path
from django.conf import settings


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

    # ¿Descarga directa?
    if request.GET.get('descargar') and nombres:
        return _generar_png(request, nombres, apellidos, cargo, telefono, correo)

    return render(request, 'leads/firma.html', context)


@staff_member_required
def _generar_png(request, nombres, apellidos, cargo, telefono, correo):
    """Genera la firma como PNG con Pillow y la devuelve como descarga."""
    # Import condicional: Pillow es opcional, el admin no debe crashear si falta
    try:
        import PIL
    except ImportError as exc:
        return HttpResponse(
            f'Error: Pillow no est\u00e1 instalado. Ejecute: pip install Pillow\u22ef {exc}',
            content_type='text/plain; charset=utf-8', status=501)
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError as exc:
        return HttpResponse(
            f'Error: Pillow tiene un problema de instalaci\u00f3n. Detalle: {exc}',
            content_type='text/plain; charset=utf-8', status=501)

    logo_path = os.path.join(settings.BASE_DIR.parent, 'public', 'images', 'logo-firma.png')

    # Escala base (x2 para retina)
    S = 2
    canvas_w = 450 * S
    canvas_h = 130 * S

    img = Image.new('RGBA', (canvas_w, canvas_h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)

    # Colores
    ELECTRIC = (0, 207, 255)
    OIL = (7, 43, 58)
    CYAN_GLOW = (111, 251, 255)

    # ─── Logo ───
    try:
        logo = Image.open(logo_path).convert('RGBA')
        logo.thumbnail((75 * S, 120 * S), Image.LANCZOS)
        img.paste(logo, (15 * S, 15 * S), logo)
        logo_right = 15 * S + logo.width
    except Exception:
        logo_right = 15 * S

    # ─── Línea vertical separadora ───
    line_x = max(logo_right + 15 * S, 105 * S)
    draw.line([(line_x, 15 * S), (line_x, canvas_h - 15 * S)], fill=ELECTRIC, width=max(2, int(2 * S)))

    text_x = line_x + 15 * S

    # ─── Fuente ───
    def _get_font(size):
        for font_name in [
            'arial.ttf',
            'C:/Windows/Fonts/arial.ttf',
            '/usr/share/fonts/truetype/msttcorefonts/Arial.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        ]:
            try:
                return ImageFont.truetype(font_name, size)
            except Exception:
                continue
        return ImageFont.load_default()

    font_bold = _get_font(14 * S)
    font_normal = _get_font(10 * S)
    font_small = _get_font(9 * S)
    font_tiny = _get_font(8 * S)

    y = 15 * S
    full_name = f'{capitalizar(nombres)} {capitalizar(apellidos)}'.strip()
    draw.text((text_x, y), full_name, fill=OIL, font=font_bold)

    y += 24 * S
    draw.text((text_x, y), cargo.upper(), fill=ELECTRIC, font=font_small)

    y += 16 * S
    draw.text((text_x, y), 'Código Maison', fill=OIL, font=font_small)

    y += 28 * S
    draw.line([(text_x, y), (canvas_w - 15 * S, y)], fill=CYAN_GLOW, width=max(1, int(1 * S)))

    y += 10 * S
    draw.text((text_x, y), 'San Antonio 385 Of 201, Santiago Centro', fill=OIL, font=font_normal)

    if telefono:
        y += 18 * S
        draw.text((text_x, y), f'+56 {telefono}', fill=OIL, font=font_normal)

    if correo:
        y += 18 * S
        draw.text((text_x, y), f'{correo.lower()}@codigomaison.com', fill=OIL, font=font_normal)

    draw.text((15 * S, canvas_h - 12 * S),
              'Entorno de desarrollo limpio, escalable y eficiente.',
              fill=(*OIL, 128), font=font_tiny)

    # ─── Output ───
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)

    safe_name = f'{nombres}_{apellidos}'.replace(' ', '_')
    response = HttpResponse(buf.getvalue(), content_type='image/png')
    response['Content-Disposition'] = f'attachment; filename="Firma_{safe_name}.png"'
    return response


urlpatterns = [
    path('', firma_view, name='generar-firma'),
]

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Lead, Visit
from .serializers import LeadSerializer, VisitSerializer


class ContactAPIView(generics.CreateAPIView):
    """
    POST /api/leads/
    Recibe y almacena leads del formulario de contacto.
    Captura IP, user-agent y referrer automáticamente.
    """
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Capturar datos de tracking del request
        meta = request.META
        ip = request.headers.get('X-Forwarded-For', request.META.get('REMOTE_ADDR', ''))
        if ip and ',' in ip:
            ip = ip.split(',')[0].strip()

        serializer.save(
            ip_address=ip or None,
            user_agent=meta.get('HTTP_USER_AGENT', '')[:500],
            referrer=meta.get('HTTP_REFERER', '')[:500],
            consent_given=request.data.get('consent', False),
        )

        return Response(
            {'detail': 'Mensaje recibido correctamente'},
            status=status.HTTP_201_CREATED,
        )


class TrackVisitAPIView(generics.CreateAPIView):
    """
    POST /api/track/
    Registra una visita anónima a la página (con consentimiento).
    """
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        meta = request.META
        ip = request.headers.get('X-Forwarded-For', request.META.get('REMOTE_ADDR', ''))
        if ip and ',' in ip:
            ip = ip.split(',')[0].strip()

        serializer.save(
            ip_address=ip or None,
            user_agent=meta.get('HTTP_USER_AGENT', '')[:500],
            referrer=meta.get('HTTP_REFERER', '')[:500],
        )

        return Response(
            {'detail': 'Visita registrada'},
            status=status.HTTP_201_CREATED,
        )


class DashboardStatsAPIView(generics.ListAPIView):
    """
    GET /api/admin/stats/
    Estadísticas para el backoffice (requiere autenticación).
    """
    permission_classes = [permissions.IsAdminUser]
    queryset = Lead.objects.none()
    serializer_class = LeadSerializer

    def list(self, request, *args, **kwargs):
        total_leads = Lead.objects.count()
        unread_leads = Lead.objects.filter(is_read=False).count()
        total_visits = Visit.objects.count()
        recent_leads = Lead.objects.order_by('-created_at')[:10]
        recent_visits = Visit.objects.order_by('-visited_at')[:10]

        return Response({
            'total_leads': total_leads,
            'unread_leads': unread_leads,
            'total_visits': total_visits,
            'recent_leads': LeadSerializer(recent_leads, many=True).data,
            'recent_visits': VisitSerializer(recent_visits, many=True).data,
        })

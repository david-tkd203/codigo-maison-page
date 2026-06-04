from django.urls import path
from .views import ContactAPIView, TrackVisitAPIView, DashboardStatsAPIView, FirmaView

urlpatterns = [
    path('leads/', ContactAPIView.as_view(), name='contact-lead'),
    path('track/', TrackVisitAPIView.as_view(), name='track-visit'),
    path('admin/stats/', DashboardStatsAPIView.as_view(), name='dashboard-stats'),
    path('firma/', FirmaView.as_view(), name='generar-firma'),
]

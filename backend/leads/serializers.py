from rest_framework import serializers
from .models import Lead, Visit


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = [
            'name', 'company', 'sector', 'whatsapp', 'email',
            'project_type', 'investment', 'message',
            'ip_address', 'user_agent', 'referrer', 'consent_given',
        ]
        read_only_fields = ['ip_address', 'user_agent', 'referrer', 'consent_given']


class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = '__all__'
        read_only_fields = ['visited_at']

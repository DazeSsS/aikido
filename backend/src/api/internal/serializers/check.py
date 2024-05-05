from rest_framework.serializers import ModelSerializer

from api.models import Check


class CheckSerializer(ModelSerializer):
    class Meta:
        model = Check
        fields = '__all__'

from rest_framework.serializers import ModelSerializer

from api.models import Place


class PlaceSerializer(ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'

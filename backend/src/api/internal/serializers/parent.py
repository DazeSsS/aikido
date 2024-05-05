from rest_framework.serializers import ModelSerializer

from api.models import Parent


class ParentSerializer(ModelSerializer):
    class Meta:
        model = Parent
        fields = [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'contact',
        ]

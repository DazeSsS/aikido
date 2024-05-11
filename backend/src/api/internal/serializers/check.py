from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import Check


class CheckSerializer(ModelSerializer):
    file = serializers.FileField(max_length=None, use_url=False)

    class Meta:
        model = Check
        fields = [
            'id',
            'account',
            'file',
            'date',
            'amount'
        ]

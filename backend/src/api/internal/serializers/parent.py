from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import Parent, User


class ParentSerializer(ModelSerializer):
    childs = serializers.PrimaryKeyRelatedField(queryset=User.objects, required=True, many=True)

    class Meta:
        model = Parent
        fields = [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'contact',
            'childs',
        ]

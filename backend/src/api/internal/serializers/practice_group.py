from rest_framework.serializers import ModelSerializer

from api.models import PracticeGroup

from .user import UserSerializer
from .place import PlaceSerializer


class GroupSerializer(ModelSerializer):
    place = PlaceSerializer(read_only=True)
    trainer = UserSerializer(read_only=True)

    class Meta:
        model = PracticeGroup
        fields = [
            'id',
            'title',
            'place',
            'trainer',
            'students',
        ]

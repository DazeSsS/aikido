from rest_framework.serializers import ModelSerializer

from api.models import Practice

from .user import StudentSerializer
from .place import PlaceSerializer
from .practice_group import GroupSerializer


class PracticeSerializer(ModelSerializer):
    group = GroupSerializer(read_only=True)
    place = PlaceSerializer(read_only=True)

    class Meta:
        model = Practice
        fields = [
            'id',
            'price',
            'place',
            'group',
            'attended',
            'trial',
            'date',
            'duration',
        ]


class TrainerPracticeSerializer(PracticeSerializer):
    attended = StudentSerializer(read_only=True)
    trial = StudentSerializer(read_only=True)



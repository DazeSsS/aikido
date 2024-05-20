from datetime import datetime, timedelta

from rest_framework.serializers import ModelSerializer, SerializerMethodField

from api.models import Practice

from .user import StudentSerializer
from .place import PlaceSerializer
from .practice_group import GroupSerializer


class PracticeSerializer(ModelSerializer):
    group = GroupSerializer(read_only=True)
    place = PlaceSerializer(read_only=True)
    end_time = SerializerMethodField(read_only=True)

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
            'end_time',
        ]
    
    def get_end_time(self, obj):
        return obj.date + timedelta(minutes=obj.duration)


class TrainerPracticeSerializer(PracticeSerializer):
    attended = StudentSerializer(read_only=True)
    trial = StudentSerializer(read_only=True)

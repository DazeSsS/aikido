from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import User, PracticeGroup

from .payment_account import PaymentAccountSerializer
from .parent import ParentSerializer


class UserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)
    photo = serializers.ImageField(max_length=None, use_url=False, required=False)
    
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'password',
            'role',
            'first_name',
            'last_name',
            'middle_name',
            'gender',
            'date_of_birth',
            'rang',
            'phone_number',
            'photo'
        ]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class TrainerSerializer(UserSerializer):
    class Meta:
        model = User
        fields = UserSerializer.Meta.fields + ['is_staff']
        read_only_fields = ['is_staff']


class GroupInfoSerializer(ModelSerializer):
    class Meta:
        model = PracticeGroup
        fields = [
            'id',
            'title',
        ]


class StudentSerializer(UserSerializer):
    parents = ParentSerializer(many=True, read_only=True)
    account = PaymentAccountSerializer(read_only=True)
    group = GroupInfoSerializer(read_only=True, source='get_my_group')
    age = serializers.IntegerField(source='get_age')

    class Meta:
        model = User
        fields = UserSerializer.Meta.fields + ['age', 'parents', 'account', 'group']


class StudentInfoSerializer(ModelSerializer):
    age = serializers.IntegerField(source='get_age')

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'age',
            'photo',
        ]

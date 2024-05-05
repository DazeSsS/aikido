from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import User

from .payment_account import PaymentAccountSerializer
from .parent import ParentSerializer


class UserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)
    
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
        ]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class StudentSerializer(UserSerializer):
    password = serializers.CharField(write_only=True, required=False)
    parents = ParentSerializer(many=True, read_only=True)
    account = PaymentAccountSerializer(read_only=True)

    class Meta:
        model = User
        fields = UserSerializer.Meta.fields + ['parents', 'account']

    def create(self, validated_data):
        validated_data['password'] = User.objects.make_random_password(8)
        user = User.objects.create_user(**validated_data)
        return user

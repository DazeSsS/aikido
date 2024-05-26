from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import Check

from .user import StudentInfoSerializer
from .payment_account import PaymentAccountSerializer


class CheckSerializer(ModelSerializer):
    file = serializers.FileField(max_length=None, use_url=False)

    class Meta:
        model = Check
        fields = [
            'id',
            'account',
            'file',
            'date',
            'amount',
            'confirmed'
        ]


class TrainerCheckSerializer(CheckSerializer):
    user = StudentInfoSerializer(read_only=True, source='account.user')
    account = PaymentAccountSerializer(read_only=True)

    class Meta:
        model = Check
        fields = CheckSerializer.Meta.fields + ['user', 'account']

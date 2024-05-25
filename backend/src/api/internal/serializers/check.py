from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import Check, CheckViews

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
        ]


class TrainerCheckSerializer(CheckSerializer):
    user = StudentInfoSerializer(read_only=True, source='account.user')
    account = PaymentAccountSerializer(read_only=True)
    viewed = serializers.SerializerMethodField()

    class Meta:
        model = Check
        fields = CheckSerializer.Meta.fields + ['user', 'account', 'viewed']

    def get_viewed(self, check):
        user = self.context.get('user', None)
        return CheckViews.objects.filter(user=user, payment_check=check).exists()

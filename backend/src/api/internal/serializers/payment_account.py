from rest_framework.serializers import ModelSerializer

from api.models import PaymentAccount


class PaymentAccountSerializer(ModelSerializer):
    class Meta:
        model = PaymentAccount
        fields = [
            'id',
            'balance',
            'debt',
        ]

from rest_framework.serializers import ModelSerializer

from api.models import Check, Parent, PaymentAccount, Place, Practice, PracticeGroup, User


class CheckSerializer(ModelSerializer):
    class Meta:
        model = Check
        fields = '__all__'


class ParentSerializer(ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'


class PaymentAccountSerializer(ModelSerializer):
    class Meta:
        model = PaymentAccount
        fields = '__all__'


class PlaceSerializer(ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'


class PracticeSerializer(ModelSerializer):
    class Meta:
        model = Practice
        fields = '__all__'


class PracticeGroupSerializer(ModelSerializer):
    class Meta:
        model = PracticeGroup
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'role',
            'first_name',
            'last_name',
            'middle_name',
            'gender',
            'date_of_birth',
            'rang',
        ]

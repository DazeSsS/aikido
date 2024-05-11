from django.conf import settings
from django.core.mail import send_mail
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import User

from .payment_account import PaymentAccountSerializer
from .parent import ParentSerializer


class UserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)
    photo = serializers.ImageField(max_length=None, use_url=False)
    
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'password',
            'role',
            'is_staff',
            'first_name',
            'last_name',
            'middle_name',
            'gender',
            'date_of_birth',
            'rang',
            'photo'
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
        random_password = User.objects.make_random_password(8)
        validated_data['password'] = random_password

        user = User.objects.create_user(**validated_data)

        user_email = validated_data['email']
        send_mail(
            subject="Регистрация на AikiDojo",
            message=(
                'Поздравляем, ваш аккаунт был успешно зарегистрирован на AikiDojo!\n\n'
                'Данные для входа:\n'
                f'логин: {user_email}\n'
                f'пароль: {random_password}\n\n'
                'Если вы случайно получили это сообщение - не пугайтесь, мы просто группа студентов, '
                'которая разрабатывает веб-сервис, и мы могли случайно указать ваш email при тестировании🙂'
            ),
            html_message=(
                '<b>Поздравляем, ваш аккаунт был успешно зарегистрирован на AikiDojo!</b><br><br>'
                'Данные для входа:<br>'
                f'<i>логин:</i> {user_email}<br>'
                f'<i>пароль:</i> {random_password}<br><br>'
                'Если вы случайно получили это сообщение - не пугайтесь, мы просто группа студентов, '
                'которая разрабатывает веб-сервис, и мы могли случайно указать ваш email при тестировании🙂'
            ),
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user_email, settings.EMAIL_HOST_USER]
        )

        return user

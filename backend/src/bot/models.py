from django.db import models

from api.models import User


class TelegramUser(models.Model):
    chat_id = models.IntegerField(primary_key=True)
    account = models.OneToOneField(User, on_delete=models.CASCADE, related_name='telegram')

    def __str__(self):
        return f'{self.account.email}'

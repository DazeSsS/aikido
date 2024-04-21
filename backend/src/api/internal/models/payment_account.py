from django.db import models


class PaymentAccount(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='account')
    balance = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    debt = models.DecimalField(max_digits=7, decimal_places=2, default=0)

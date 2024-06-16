from datetime import datetime
from django.db import models
from django.db.models import DecimalField


class PaymentAccount(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='account')
    balance = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    debt = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    def __str__(self):
        return f'{self.user.email} Balance: {self.balance} | Debt: {self.debt}'

    def save(self, *args, **kwargs):
        balance = -1 * self.debt + self.balance
        if balance < 0:
            self.balance = 0
            self.debt = abs(balance)
        else:
            self.balance = balance
            self.debt = 0

        super(PaymentAccount, self).save(*args, **kwargs)

    def increase_debt(self, amount):
        self.debt += amount
        self.save()

    def reduce_debt(self, amount):
        self.balance += amount
        self.save()

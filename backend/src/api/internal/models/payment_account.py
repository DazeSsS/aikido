from datetime import datetime
from django.db import models
from django.db.models import DecimalField


class PaymentAccount(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='account')
    balance = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    debt = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    last_payment = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.user.email

    def save(self, *args, **kwargs):
        balance = -1 * self.debt + self.balance
        if balance < 0:
            self.balance = 0
            self.debt = abs(balance)
        else:
            self.balance = balance
            self.debt = 0

        super(PaymentAccount, self).save(*args, **kwargs)

    def calculate_balance(self):
        if self.last_payment is None:
            free_practices = self.user.trials.all()
            visited_practices = self.user.practices.all().difference(free_practices)
        else:
            free_practices = self.user.trials.filter(date__gte=self.last_payment)
            visited_practices = self.user.practices.filter(date__gte=self.last_payment).difference(free_practices)
        
        total_price = sum(practice.price for practice in visited_practices)
        if total_price is not None:
            self.debt += total_price
            self.last_payment = datetime.now()

        self.save()

    def pay(self, amount):
        self.balance += amount
        self.last_payment = datetime.now()
        self.save()

from django.db import models


def check_upload_path(instance, filename):
    return f'checks/{instance.account.user.email}/%Y-%m-%d_{filename}'


class Check(models.Model):
    account = models.ForeignKey('PaymentAccount', on_delete=models.CASCADE, related_name='checks')
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    photo = models.FileField(upload_to=check_upload_path)
    date = models.DateField(auto_now=True)

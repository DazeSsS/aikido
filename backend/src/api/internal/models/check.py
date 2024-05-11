from datetime import date
from django.db import models


def check_upload_path(instance, filename):
    return 'checks/{0}/{1}_{2}'.format(
        instance.account.user.email,
        date.today().strftime('%Y-%m-%d'),
        filename
    )


class Check(models.Model):
    account = models.ForeignKey('PaymentAccount', on_delete=models.CASCADE, related_name='checks')
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    file = models.FileField(upload_to=check_upload_path)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.account.user} {self.date}'

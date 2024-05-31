from datetime import datetime, timezone
from django.db import models


def check_upload_path(instance, filename):
    return 'checks/{0}/{1}_{2}'.format(
        instance.account.user.email,
        datetime.now(timezone.utc).strftime('%Y-%m-%d'),
        filename
    )


class Check(models.Model):
    account = models.ForeignKey('PaymentAccount', null=True, on_delete=models.SET_NULL, related_name='checks')
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    file = models.FileField(upload_to=check_upload_path)
    date = models.DateField(auto_now_add=True)
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        if account is not None:
            string = f'{self.account.user} {self.date}'
        else:
            string = f'{self.date}'
        return string

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
        if self.account is not None:
            string = f'{self.account.user} {self.date}'
        else:
            string = f'{self.date}'
        return string

    def set_confirmed(self):
        self.confirmed = True
        self.account.reduce_debt(self.amount)
        self.save()

    def get_attached_trainer(self):
        return self.account.user.get_group().trainer

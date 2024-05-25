from django.db import models

from .check import Check, CheckViews


class PaymentAccount(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='account')
    balance = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    debt = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    def __str__(self):
        return self.user.email

    def get_new_checks(self, viewer):
        checks = self.checks.all()
        new_checks = Check.objects.none()
        for check in checks:
            check_view = CheckViews.objects.filter(user=viewer, payment_check=check)
            if not check_view.exists():
                new_checks = new_checks.union(Check.objects.filter(pk=check.pk))
        return new_checks

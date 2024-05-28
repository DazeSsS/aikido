from django.contrib import admin

from api.models import PaymentAccount


@admin.register(PaymentAccount)
class PaymentAccountAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'last_payment')
    fields = (
        'id',
        'user',
        'balance',
        'debt',
        'last_payment',
    )

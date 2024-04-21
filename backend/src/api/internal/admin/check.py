from django.contrib import admin

from api.models import Check


@admin.register(Check)
class CheckAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'account',
        'photo',
        'date',
        'amount',
    )

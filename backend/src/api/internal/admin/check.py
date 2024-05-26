from django.contrib import admin

from api.models import Check


@admin.register(Check)
class CheckAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'date',)
    fields = (
        'id',
        'account',
        'file',
        'date',
        'amount',
        'confirmed',
    )

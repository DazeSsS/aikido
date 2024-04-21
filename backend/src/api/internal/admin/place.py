from django.contrib import admin

from api.models import Place


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'address',
        'description',
    )

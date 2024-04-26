from django.contrib import admin

from api.models import PracticeGroup


@admin.register(PracticeGroup)
class PracticeGroupAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'title',
        'trainer',
        'students',
        'place',
    )

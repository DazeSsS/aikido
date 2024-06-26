from django.contrib import admin

from api.models import Practice


@admin.register(Practice)
class PracticeAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'price',
        'group',
        'attended',
        'trial',
        'date',
        'duration',
    )
    ordering = ['-date']

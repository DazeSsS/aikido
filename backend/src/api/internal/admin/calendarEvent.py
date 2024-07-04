from django.contrib import admin

from api.models import CalendarEvent


@admin.register(CalendarEvent)
class CalendarEventAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'practice',
        'link',
    )

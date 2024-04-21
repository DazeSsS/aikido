from django.contrib import admin

from api.models import Group


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'title',
        'trainer',
        'students',
        'place',
    )

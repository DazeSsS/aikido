from django.contrib import admin

from api.models import Parent


@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'childs',
        'first_name',
        'last_name',
        'middle_name',
        'contact',
    )

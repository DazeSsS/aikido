from django.contrib import admin

from api.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'role',
        'gender',
        'rang',
        'email',
        'first_name',
        'last_name',
        'middle_name',
        'date_of_birth',
    )

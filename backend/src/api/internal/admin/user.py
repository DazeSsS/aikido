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
        'phone_number',
        'first_name',
        'last_name',
        'middle_name',
        'date_of_birth',
        'photo'
    )

    def get_fields(self, request, obj=None):
        fields = list(self.fields)
        if obj.role != User.STUDENT:
            fields.insert(2, 'is_staff')
        return fields

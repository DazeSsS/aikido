from django.contrib import admin

from api.models import GoogleToken


@admin.register(GoogleToken)
class GoogleTokenAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = (
        'id',
        'user',
        'time_zone',
        'access_token',
        'refresh_token',
        'token_uri',
        'client_id',
        'client_secret',
        'scopes',
    )

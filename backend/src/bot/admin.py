from django.contrib import admin

from bot.models import TelegramUser


@admin.register(TelegramUser)
class TelegramUserAdmin(admin.ModelAdmin):
    readonly_fields = ('chat_id',)
    fields = (
        'chat_id',
        'account',
    )

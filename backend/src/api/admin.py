from django.contrib import admin
from django.contrib.auth.models import Group

from api.internal.admin.user import UserAdmin
from api.internal.admin.parent import ParentAdmin
from api.internal.admin.payment_account import PaymentAccountAdmin
from api.internal.admin.check import CheckAdmin
from api.internal.admin.place import PlaceAdmin
from api.internal.admin.practice_group import PracticeGroupAdmin
from api.internal.admin.practice import PracticeAdmin
from api.internal.admin.googleToken import GoogleTokenAdmin
from api.internal.admin.calendarEvent import CalendarEventAdmin

admin.site.site_title = 'Aikido'
admin.site.site_header = 'Aikido'

admin.site.unregister(Group)

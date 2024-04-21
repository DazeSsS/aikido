from django.contrib import admin

from api.internal.admin.user import User
from api.internal.admin.parent import Parent
from api.internal.admin.payment_account import PaymentAccount
from api.internal.admin.check import Check
from api.internal.admin.place import Place
from api.internal.admin.group import Group
from api.internal.admin.practice import Practice

admin.site.site_title = 'Aikido'
admin.site.site_header = 'Aikido'

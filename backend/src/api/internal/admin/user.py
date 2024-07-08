from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django import forms
from api.models import User


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = (
            'role',
            'is_staff',
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

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_form = UserCreationForm
    readonly_fields = ('id',)

    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')    
    ordering = ('email',)

    fieldsets = (
        (
            None,
            {
                'fields': (
                    'id',
                    'role',
                    'is_staff',
                    'gender',
                    'rang',
                    'email',
                    'phone_number',
                    'first_name',
                    'last_name',
                    'middle_name',
                    'date_of_birth',
                    'photo',
                )
            }
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'id',
                    'role',
                    'is_staff',
                    'gender',
                    'rang',
                    'email',
                    'phone_number',
                    'first_name',
                    'last_name',
                    'middle_name',
                    'date_of_birth',
                    'photo',
                    'password1',
                    'password2',
                )
            }
        ),
    )

    def save_model(self, request, obj, form, change):
        if 'password1' in form.cleaned_data:
            obj.set_password(form.cleaned_data['password1'])
        super().save_model(request, obj, form, change)

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)

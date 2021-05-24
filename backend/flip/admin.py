from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Profile
from .forms import CustomUserChangeForm, CustomUserCreationForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = Profile
    list_display = ['email', 'username', 'country', 'trust_score']
    fieldsets = (*UserAdmin.fieldsets, ('Additional Profile settings', {
        'fields': ('bio', 'country', 'trust_score'),
    }))


admin.site.register(Profile, CustomUserAdmin)

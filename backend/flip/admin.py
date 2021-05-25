from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db.models import Count
from admin_totals.admin import ModelAdminTotals

from .models import Profile, Freelance
from .forms import CustomUserChangeForm, CustomUserCreationForm


@admin.register(Profile)
class CustomUserAdmin(ModelAdminTotals):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = Profile
    list_display = ['email', 'username', 'country', 'trust_score']
    list_filter = ['trust_score']
    list_totals = [('email', Count)]
    search_fields = ['country']
    fieldsets = (*UserAdmin.fieldsets, ('Additional Profile settings', {
        'fields': ('bio', 'country', 'trust_score'),
    }))


@admin.register(Freelance)
class MyFreelance(ModelAdminTotals):
    list_display = ['company', 'category', 'owner', 'price', 'earned', 'no_of_gigs', 'date_of_reg', 'country']
    list_filter = ['category', 'company']
    list_totals = [('company', Count)]
    search_fields = ['category', 'company']

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db.models import Count, Sum
from admin_totals.admin import ModelAdminTotals
from genericadmin.admin import GenericAdminModelAdmin, TabularInlineWithGeneric
from . import models
from .forms import CustomUserChangeForm, CustomUserCreationForm


@admin.register(models.Profile)
class CustomUserAdmin(ModelAdminTotals):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = models.Profile
    list_display = ['email', 'username', 'country', 'trust_score']
    list_filter = ['trust_score']
    list_totals = [('email', Count)]
    search_fields = ['country']
    fieldsets = (*UserAdmin.fieldsets, ('Additional Profile settings', {
        'fields': ('bio', 'country', 'trust_score'),
    }))


@admin.register(models.Transaction)
class MyTransaction(ModelAdminTotals):
    list_display = ['reference', 'owner', '_type', 'gateway', 'amount', 'closing_balance']
    list_filter = ['_type', 'timestamp', 'gateway']
    list_totals = [('closing_balance', Sum)]


@admin.register(models.Escrow)
class MyEscrow(GenericAdminModelAdmin, ModelAdminTotals):
    list_display = ['seller', 'buyer', 'amount', 'content_type', 'object_id']
    list_totals = [('seller', Count), ('amount', Sum)]


@admin.register(models.Freelance)
class MyFreelance(ModelAdminTotals):
    list_display = ['company', 'category', 'price', 'earned', 'no_of_gigs', 'date_of_reg', 'country', 'owner']
    list_filter = ['category', 'company']
    list_totals = [('company', Count)]
    search_fields = ['category', 'company']


@admin.register(models.SocialMedia)
class MySocialMedia(ModelAdminTotals):
    list_display = ['category', 'company', 'audience', 'price', 'owner']
    list_filter = ['company', 'audience']
    list_totals = [('company', Count)]

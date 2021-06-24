from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db.models import Count, Sum
from admin_totals.admin import ModelAdminTotals
from genericadmin.admin import GenericAdminModelAdmin
from . import models


class ProfileAdmin(UserAdmin):
    list_display = ['id', 'username', 'email', 'country', 'trust_score']
    search_fields = ['username', 'country']
    fieldsets = (
        *UserAdmin.fieldsets,
        ('Additional Profile settings', {
            'fields': ('bio', 'country', 'trust_score'),
        })
    )


@admin.register(models.Profile)
class CustomUserAdmin(ModelAdminTotals, ProfileAdmin):
    list_totals = [('username', Count)]


@admin.register(models.Transaction)
class MyTransaction(ModelAdminTotals):
    list_display = ['reference', 'owner', '_type', 'gateway', 'amount', 'closing_balance']
    list_filter = ['_type', 'timestamp', 'gateway']
    list_totals = [('closing_balance', Sum)]


@admin.register(models.Escrow)
class MyEscrow(GenericAdminModelAdmin, ModelAdminTotals):
    list_display = ['id', 'seller', 'buyer', 'amount', 'content_object', 'status']
    list_filter = ['status']
    list_totals = [('id', Count), ('amount', Sum)]


@admin.register(models.Freelance)
class MyFreelance(ModelAdminTotals):
    list_display = ['id', 'category', 'company', 'price', 'gigs', 'earned', 'country', 'owner']
    list_filter = ['category', 'company']
    list_totals = [('company', Count)]
    search_fields = ['category', 'company']


@admin.register(models.SocialMedia)
class MySocialMedia(ModelAdminTotals):
    list_display = ['id', 'category', 'company', 'audience', 'price', 'owner']
    list_filter = ['company', 'audience']
    list_totals = [('company', Count)]


@admin.register(models.FreelanceCompany)
class MyFreelanceCompany(ModelAdminTotals):
    list_display = ['id', 'category', 'name']
    list_filter = ['category']
    list_totals = [('id', Count)]


admin.site.register(models.Chat)
admin.site.register(models.Offer)
admin.site.register(models.FreelanceCategory)

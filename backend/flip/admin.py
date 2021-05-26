from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db.models import Count, Sum
from admin_totals.admin import ModelAdminTotals

from .models import Profile, Freelance, Chat, Message, Notification, Offer, Transaction, Escrow, SocialMedia
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


@admin.register(Transaction)
class MyTransaction(ModelAdminTotals):
    list_display = ['reference', 'owner', '_type', 'gateway', 'amount', 'closing_balance']
    list_filter = ['_type', 'timestamp', 'gateway']
    list_totals = [('closing_balance', Sum)]


class MediaObjectAdminInLine(admin.StackedInline):
    model = Escrow
    ct_field = "content_type"
    ct_fk_field = "object_id"
    extra = 0


class EscrowAdmin(admin.ModelAdmin):
    list_display = ['buyer', 'seller', 'amount', 'fee', 'status', 'object_id']
    list_filter = ['status']


admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Notification)
admin.site.register(Offer)
admin.site.register(Escrow, EscrowAdmin)
admin.site.register(SocialMedia)

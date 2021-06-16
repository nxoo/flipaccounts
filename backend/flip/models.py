from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django_countries.fields import CountryField
from djmoney.models.fields import MoneyField


class Profile(AbstractUser):
    bio = models.TextField(max_length=280, blank=True)
    country = CountryField()
    trust_score = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return self.username


class Chat(models.Model):
    user_a = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name="user_a")
    user_b = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name="user_b")
    date_created = models.DateTimeField(default=timezone.now, blank=False)

    def __str__(self):
        return "%s ---- %s" % (self.user_a, self.user_b)


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, blank=False, related_name="chat")
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, related_name="sender")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False,
                                 related_name="receiver")
    message = models.TextField()
    sent_at = models.DateTimeField(default=timezone.now, blank=False)
    read = models.BooleanField(null=True)

    def __str__(self):
        return self.sent_at.__str__()


class Notification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False,
                                  related_name="notification_recipient")
    notification = models.TextField()
    sent_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.notification


class Transaction(models.Model):
    class Gateway(models.TextChoices):
        lipisha = '1', "lipisha"
        paxful = '2', "paxful"
        internal = '3', "internal"

    class _Type(models.TextChoices):
        deposit = '1', "deposit"
        withdraw = '2', "withdraw"
        escrow1 = '3', "deposit to escrow"
        escrow2 = '4', "withdraw from escrow"
        fee = '5', "fee"
        promote = '6', "promote"

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transaction_owner',
                              blank=False)
    _type = models.CharField(max_length=2, choices=_Type.choices, blank=False)
    gateway = models.CharField(max_length=2, choices=Gateway.choices, blank=False)
    amount = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', blank=False)
    closing_balance = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', blank=False)
    timestamp = models.DateTimeField(auto_now_add=True, blank=False)
    reference = models.CharField(max_length=200, blank=False, unique=True)

    def __str__(self):
        return self.reference


class Escrow(models.Model):
    class Status(models.TextChoices):
        _open = '1', "open"
        closed = '2', "closed"
        dispute = '3', "dispute"

    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='buyer', blank=False)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='seller', blank=False)
    amount = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', blank=False)
    fee = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', blank=False)
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, blank=False)
    status = models.CharField(max_length=2, choices=Status.choices, blank=False)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, blank=False)
    content_type = models.ForeignKey(
        ContentType, default=None, null=True, on_delete=models.SET_NULL, related_name='escrow_item', limit_choices_to={
            'model__in': ('freelance', 'socialmedia')
        })
    object_id = models.PositiveIntegerField(default=None, null=True)
    object = GenericForeignKey(ct_field="content_type", fk_field="object_id")

    def __str__(self):
        return "%s --- %s" % (self.buyer, self.seller)


class Offer(models.Model):
    class Status(models.TextChoices):
        accept = '1', 'accepted'
        reject = '2', 'rejected'
        ignore = '3', 'waiting'

    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False,
                               related_name="offer_sender")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False,
                                 related_name="offer_receiver")
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', blank=False)
    sent_at = models.DateTimeField(default=timezone.now, blank=False)
    status = models.CharField(max_length=100, choices=Status.choices, blank=False)
    content_type = models.ForeignKey(
        ContentType, default=None, null=True, on_delete=models.SET_NULL, related_name='offer_item', limit_choices_to={
            'model__in': ('freelance', 'socialmedia')
        })
    object_id = models.PositiveIntegerField(default=None, null=True)
    object = GenericForeignKey(ct_field="content_type", fk_field="object_id")

    def __str__(self):
        return self.sender


class Freelance(models.Model):
    class Type(models.TextChoices):
        transcription = '1', 'transcription'
        academic_w = '2', 'academic writing'
        article_w = '3', 'article writing'
        general = '4', 'general'
        tasks = '5', 'tasks'

    class Company(models.TextChoices):
        rev = '1', 'rev'
        verbit = '2', 'verbit'
        transcribe_me = '3', 'transcribe me'
        essay_shark = '4', 'essay shark'
        iwriters = '5', 'iwriters'
        upwork = '6', 'upwork'

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False,
                              related_name="freelance_owner")
    type = models.CharField(max_length=100, choices=Type.choices, blank=False)
    company = models.CharField(max_length=100, choices=Company.choices, blank=False)
    category = models.CharField(max_length=100, blank=True)
    rating = models.IntegerField(default=0)
    date_of_reg = models.DateField(blank=False)
    no_of_gigs = models.IntegerField(default=0, blank=False)
    earned = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', default=0)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', blank=False)
    hide_price = models.BooleanField()
    offers = models.BooleanField()
    auction = models.BooleanField()
    auction_increment = models.IntegerField(default=0)
    verification_needed = models.BooleanField()
    verified = models.BooleanField()
    country = CountryField()
    vpn_need = models.BooleanField()
    original_email = models.BooleanField()
    description = models.TextField(max_length=280, blank=True)
    pub_date = models.DateTimeField(blank=False, default=timezone.now)
    on_escrow = models.BooleanField()
    sold = models.BooleanField(default=False)
    offer_item = GenericRelation(Offer, content_type_field='content_type', object_id_field='object_id',
                                 related_query_name='freelance')
    escrow_item = GenericRelation(Escrow, content_type_field='content_type', object_id_field='object_id',
                                  related_query_name='freelance')

    def __str__(self):
        return self.description


class SocialMedia(models.Model):
    class Company(models.TextChoices):
        instagram = '1', 'instagram'
        twitter = '2', 'twitter'
        tiktok = '3', 'tiktok'
        youtube = '4', 'youtube'
        facebook_page = '5', 'facebook page'
        facebook_group = '6', 'facebook group'
        telegram_group = '7', 'telegram group'
        telegram_channel = '8', 'telegram channel'
        whatsapp_group = '9', 'whatsapp group'
        snapchat = '10', 'snapchat'

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False,
                              related_name="social_media_owner")
    category = models.CharField(max_length=100)
    company = models.CharField(max_length=200, choices=Company.choices, blank=False)
    username = models.CharField(max_length=100, blank=False)
    audience = models.IntegerField(default=0, blank=False)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', blank=False)
    hide_price = models.BooleanField()
    offers = models.BooleanField()
    description = models.TextField(max_length=240, blank=True)
    no_of_posts = models.IntegerField(default=0, blank=False)
    country = CountryField()
    date_of_reg = models.DateField(blank=True, null=True)
    original_email = models.BooleanField()
    audience_report = models.BooleanField()
    ownership_verified = models.BooleanField()
    pub_date = models.DateTimeField(default=timezone.now)
    sold = models.BooleanField(default=False)
    offer_item = GenericRelation(Offer, content_type_field='content_type', object_id_field='object_id',
                                 related_query_name='social_media')
    escrow_item = GenericRelation(Escrow, content_type_field='content_type', object_id_field='object_id',
                                  related_query_name='social_media')

    def __str__(self):
        return self.description

from django.db import models
from django.contrib.auth.models import AbstractUser
from django_countries.fields import CountryField
from djmoney.models.fields import MoneyField


class Profile(AbstractUser):
    bio = models.TextField(max_length=280, blank=True)
    country = CountryField()
    trust_score = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return self.username


class Category(models.TextChoices):
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


class Freelance(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=False)
    category = models.CharField(max_length=100, choices=Category.choices, blank=False)
    company = models.CharField(max_length=100, choices=Company.choices, blank=False)
    date_of_reg = models.DateField(blank=False)
    earned = MoneyField(max_digits=14, decimal_places=2, default_currency='USD')
    no_of_gigs = models.IntegerField(default=0, blank=False)
    country = CountryField()
    description = models.TextField(max_length=280)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD')
    hide_price = models.BooleanField()
    offers = models.BooleanField()
    vpn_need = models.BooleanField()
    verification_needed = models.BooleanField()
    verified = models.BooleanField()
    original_email = models.BooleanField()
    pub_date = models.DateField(blank=False)

    def __str__(self):
        return self.description

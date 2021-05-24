from django.db import models
from django.contrib.auth.models import AbstractUser
from django_countries.fields import CountryField


class Profile(AbstractUser):
    bio = models.TextField(max_length=280, blank=True)
    country = CountryField()
    trust_score = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return self.username

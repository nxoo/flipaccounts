from rest_framework import serializers
from django_countries.serializers import CountryFieldMixin
from .models import Profile


class UserSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'bio', 'country', 'trust_score']

from rest_framework import serializers
from django_countries.serializers import CountryFieldMixin
from .models import Profile, Freelance


class UserSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'bio', 'country', 'trust_score']


class FreelanceSerializer(CountryFieldMixin, serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Freelance
        fields = '__all__'

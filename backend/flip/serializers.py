from rest_framework import serializers
from django_countries.serializers import CountryFieldMixin
from . import models


class UserSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'bio', 'country', 'trust_score']


class ChatSerializer(serializers.ModelSerializer):
    user_a = serializers.ReadOnlyField(source='user_a.username')

    class Meta:
        model = models.Chat
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = models.Message
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = models.Transaction
        fields = '__all__'


class EscrowSerializer(serializers.ModelSerializer):
    buyer = serializers.ReadOnlyField(source='buyer.username')

    class Meta:
        model = models.Escrow
        fields = '__all__'


class OfferSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = models.Offer
        fields = '__all__'


class FreelanceSerializer(CountryFieldMixin, serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = models.Freelance
        fields = '__all__'


class SocialMediaSerializer(CountryFieldMixin, serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = models.SocialMedia
        fields = '__all__'

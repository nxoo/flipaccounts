from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from . import models
from . import serializers


class GoogleLogin(SocialLoginView):
    authentication_classes = []  # disable authentication
    adapter_class = GoogleOAuth2Adapter
    callback_url = "https://www.flipaccounts.com/api/auth/callback/google"
    client_class = OAuth2Client


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.UserSerializer


class ChatViewSet(viewsets.ModelViewSet):
    queryset = models.Chat.objects.all()
    serializer_class = serializers.ChatSerializer

    def perform_create(self, serializer):
        serializer.save(user_a=self.request.user)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = models.Notification.objects.all()
    serializer_class = serializers.NotificationSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EscrowViewSet(viewsets.ModelViewSet):
    queryset = models.Escrow.objects.all()
    serializer_class = serializers.EscrowSerializer

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)


class OfferViewSet(viewsets.ModelViewSet):
    queryset = models.Offer.objects.all()
    serializer_class = serializers.OfferSerializer

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class FreelanceViewSet(viewsets.ModelViewSet):
    queryset = models.Freelance.objects.all()
    parser_classes = [MultiPartParser]
    serializer_class = serializers.FreelanceSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SocialMediaViewSet(viewsets.ModelViewSet):
    queryset = models.SocialMedia.objects.all()
    serializer_class = serializers.SocialMediaSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FreelanceCategoryViewSet(viewsets.ModelViewSet):
    queryset = models.FreelanceCategory.objects.all()
    serializer_class = serializers.FreelanceCategorySerializer


class FreelanceCompanyViewSet(viewsets.ModelViewSet):
    queryset = models.FreelanceCompany.objects.all()
    serializer_class = serializers.FreelanceCompanySerializer

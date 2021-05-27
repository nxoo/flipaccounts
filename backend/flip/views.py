from rest_framework import viewsets
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings

from .models import Profile, Freelance
from .serializers import UserSerializer, FreelanceSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserSerializer


class FreelanceViewSet(viewsets.ModelViewSet):
    queryset = Freelance.objects.all()
    serializer_class = FreelanceSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GoogleLogin(SocialLoginView):
    authentication_classes = [] # disable authentication
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000"
    client_class = OAuth2Client


from rest_framework import viewsets
from .models import Profile
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserSerializer

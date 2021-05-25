from rest_framework import viewsets
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


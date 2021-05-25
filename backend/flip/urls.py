from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, FreelanceViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'freelance', FreelanceViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
]

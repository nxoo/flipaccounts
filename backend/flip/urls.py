from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'chat', views.ChatViewSet)
router.register(r'message', views.MessageViewSet)
router.register(r'notification', views.NotificationViewSet)
router.register(r'transaction', views.TransactionViewSet)
router.register(r'escrow', views.EscrowViewSet)
router.register(r'offer', views.OfferViewSet)
router.register(r'freelance', views.FreelanceViewSet)
router.register(r'socialmedia', views.SocialMediaViewSet)


urlpatterns = [
    path('', include(router.urls)),
]

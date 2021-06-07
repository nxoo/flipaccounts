"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import environ
from django.contrib import admin
from django.urls import path, include
from flip.views import GoogleLogin

env = environ.Env()

urlpatterns = [
    path('api/', include('flip.urls')),
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/register/', include('dj_rest_auth.registration.urls')),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('%s/' % (env('ADMIN_URL')), admin.site.urls),
]

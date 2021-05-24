from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Profile


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = Profile
        fields = '__all__'


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = Profile
        fields = '__all__'

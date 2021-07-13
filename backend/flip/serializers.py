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


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
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


class FreelanceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FreelanceCategory
        fields = '__all__'


class FreelanceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FreelanceCompany
        fields = '__all__'


class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension
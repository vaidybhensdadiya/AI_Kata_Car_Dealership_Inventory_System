from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Vehicle

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for representing User metadata safely.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Validates required fields, password length, and uniqueness of email & username.
    """
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')

    def validate_email(self, value: str) -> str:
        """Ensure email is unique across all users."""
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email address already exists.")
        return value.lower()

    def create(self, validated_data: dict) -> User:
        """Create and return a new User instance with hashed password."""
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )


class VehicleSerializer(serializers.ModelSerializer):
    """
    Serializer for Vehicle model with validation for price and quantity.
    """
    class Meta:
        model = Vehicle
        fields = ('id', 'make', 'model', 'category', 'price', 'quantity', 'year', 'image_url', 'description', 'created_at', 'updated_at')

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        return value

    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Quantity cannot be negative.")
        return value

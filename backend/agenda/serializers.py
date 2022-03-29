from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Contact, Address, Phone, ESTADOS, TIPOS_TELEFONO


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields = ("username", 
                  "id",)


class ContactSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Contact
        fields = ("id",
                  "user",
                  "first_name",
                  "last_name",
                  "image",
                  "birthdate",)

    
class AddressSerializer(serializers.ModelSerializer):
    
    state_display_value = serializers.CharField(source="get_state_display", read_only=True)
    
    class Meta:
        model = Address
        fields = ("id",
                  "contact",
                  "street_name",
                  "external_number",
                  "internal_number",
                  "district",
                  "city",
                  "state",
                  "state_display_value",
                  "reference",)
        

class PhoneSerializer(serializers.ModelSerializer):
    
    phone_type_display_value = serializers.CharField(source="get_phone_type_display", read_only=True)
    
    class Meta:
        model = Phone
        fields = ("id",
                  "contact",
                  "phone_type",
                  "alias",
                  "number",
                  "phone_type_display_value")
        
        
class TokenSerializer(serializers.ModelSerializer):
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Token
        fields = ["key", "user"]
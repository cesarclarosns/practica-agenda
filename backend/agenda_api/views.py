from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from agenda.models import Contact, Address, Phone
from agenda.serializers import ContactSerializer, AddressSerializer, PhoneSerializer

from .permissions import IsContactOwner

# Contact Views 
class ContactList(generics.ListCreateAPIView):    
    serializer_class = ContactSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def get_queryset(self):
        user = self.request.user
        print(user)
        return Contact.objects.filter(user__pk = user.id)
    

class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContactSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsContactOwner]
    
    def get_queryset(self):
        user = self.request.user
        return Contact.objects.filter(user__pk = user.id)    

# Address Views
class AddressList(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    
    def get_queryset(self):
        user = self.request.user
        contact_id = self.kwargs['contact_id']
        return Address.objects.filter(contact__pk = contact_id, contact__user__pk = user.id )
        
    
class AddressDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer

    def get_queryset(self):
        user = self.request.user
        return Address.objects.filter(contact__user__pk = user.id)
    
    
# Phone Views
class PhoneList(generics.ListCreateAPIView):
    serializer_class = PhoneSerializer
    
    def get_queryset(self):
        user = self.request.user
        contact_id = self.kwargs['contact_id']
        return Phone.objects.filter(contact__pk = contact_id, contact__user__pk = user.id)
    

class PhoneDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PhoneSerializer

    def get_queryset(self):
        user = self.request.user
        return Phone.objects.filter(contact__user__pk = user.id)

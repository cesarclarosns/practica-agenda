from django.urls import path
from .views import ContactList, ContactDetail, AddressList, AddressDetail, PhoneList, PhoneDetail


urlpatterns = [
    # Contacts
    path('contacts/<int:pk>/', ContactDetail.as_view()),
    path('contacts/', ContactList.as_view()), # All contacts related to the user logged in
    # Addresses
    path('addresses/<int:pk>/', AddressDetail.as_view()),
    path('addresses/contact/<int:contact_id>/', AddressList.as_view()), # All addresses related to a contact
    # Phones
    path('phones/<int:pk>/', PhoneDetail.as_view()),
    path('phones/contact/<int:contact_id>/', PhoneList.as_view()), # All phones related to a contact
]
from django.contrib import admin
from agenda.models import *

admin.site.register(User)
admin.site.register(Contact)
admin.site.register(Address)
admin.site.register(Phone)
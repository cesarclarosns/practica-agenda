from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

ESTADOS = (
    ("AGU", "Aguascalientes"),
    ("BCN", "Baja California"),
    ("BCS", "Baja California Sur"),
    ("CAM", "Campeche"),
    ("CHP", "Chiapas"),
    ("CHH", "Chihuahua"),
    ("CMX", "Ciudad de México"),
    ("COA", "Coahuila"),
    ("COL", "Colima"),
    ("DUR", "Durango"),
    ("GUA", "Guanajuato"),
    ("GRO", "Guerrero"),
    ("HID", "Hidalgo"),
    ("JAL", "Jalisco"),
    ("MEX", "México"),
    ("MIC", "Michoacán"),
    ("MOR", "Morelos"),
    ("NAY", "Nayarit"),
    ("NLE", "Nuevo León"),
    ("OAX", "Oaxaca"),
    ("PUE", "Puebla"),
    ("QUE", "Querétaro"),
    ("ROO", "Quintana Roo"),
    ("SLP", "San Luis Potosí"),
    ("SIN", "Sinaloa"),
    ("SON", "Sonora"),
    ("TAB", "Tabasco"),
    ("TAM", "Tamaulipas"),
    ("TLA", "Tlaxcala"),
    ("VER", "Veracruz"),
    ("YUC", "Yucatán"),
    ("ZAC", "Zacatecas"),
)

TIPOS_TELEFONO = (
    (1, "Casa"),
    (2, "Teléfono móvil"),
)


def upload_to(instance, filename):
    return 'contacts/{filename}'.format(filename=filename)

class User(AbstractUser):

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
    
    def __str__(self):
        return self.username


class Contact(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE) # nuevo
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=120)
    image = models.ImageField(_("Image"), upload_to=upload_to, blank=False)
    birthdate = models.DateField(default=None, null=True, blank=True)

    class Meta:
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Address(models.Model):
    contact = models.ForeignKey("Contact", on_delete=models.CASCADE)
    street_name = models.CharField(max_length=255)
    external_number = models.CharField(max_length=10)
    internal_number = models.CharField(max_length=10)
    district = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=3, choices=ESTADOS)
    reference = models.TextField()

    class Meta:
        verbose_name = "Dirección"
        verbose_name_plural = "Direcciones"

    def __str__(self):
        return "{}: {}".format(self.contact.first_name, self.state)



class Phone(models.Model):
    contact = models.ForeignKey("Contact", on_delete=models.CASCADE)
    phone_type = models.IntegerField(choices=TIPOS_TELEFONO)
    alias = models.CharField(max_length=255)
    number = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Teléfono"
        verbose_name_plural = "Teléfonos"

    def __str__(self):
        return "{}: {}".format(self.contact.first_name, self.number)

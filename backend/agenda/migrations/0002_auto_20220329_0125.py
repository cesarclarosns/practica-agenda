# Generated by Django 2.2.27 on 2022-03-29 01:25

import agenda.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agenda', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='image',
            field=models.ImageField(upload_to=agenda.models.upload_to, verbose_name='Image'),
        ),
    ]

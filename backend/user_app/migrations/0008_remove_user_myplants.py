# Generated by Django 5.0 on 2023-12-08 21:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0007_user_myplants'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='myplants',
        ),
    ]

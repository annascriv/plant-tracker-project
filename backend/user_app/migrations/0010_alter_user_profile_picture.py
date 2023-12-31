# Generated by Django 5.0 on 2023-12-12 20:29

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0009_user_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default=None, null=True, storage=django.core.files.storage.FileSystemStorage(location='media/photos'), upload_to=''),
        ),
    ]

# Generated by Django 4.2.7 on 2023-12-12 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0008_remove_user_myplants'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='profile_pic/'),
        ),
    ]
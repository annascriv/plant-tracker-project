# Generated by Django 5.0 on 2023-12-05 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favorites_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='garden',
            name='name',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
    ]
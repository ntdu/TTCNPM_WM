# Generated by Django 3.1.1 on 2021-05-05 07:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0004_delete_inventory'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Material',
        ),
    ]

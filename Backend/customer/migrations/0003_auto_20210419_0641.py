# Generated by Django 3.1.4 on 2021-04-18 23:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0002_inventory_material'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='gender',
            new_name='female',
        ),
    ]

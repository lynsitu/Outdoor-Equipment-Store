# Generated by Django 4.2 on 2023-05-09 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_order_shippingaddress_orderitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
# Generated by Django 3.2.3 on 2021-07-20 16:39

from decimal import Decimal
from django.db import migrations
import djmoney.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('flip', '0003_alter_freelance_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='freelance',
            name='price',
            field=djmoney.models.fields.MoneyField(blank=True, decimal_places=2, default=Decimal('0.0'), default_currency='USD', max_digits=14),
        ),
    ]

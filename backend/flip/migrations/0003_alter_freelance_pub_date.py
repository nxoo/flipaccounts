# Generated by Django 3.2.3 on 2021-05-30 02:32

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('flip', '0002_auto_20210530_0531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='freelance',
            name='pub_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
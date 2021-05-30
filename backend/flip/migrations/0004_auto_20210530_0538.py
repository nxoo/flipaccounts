# Generated by Django 3.2.3 on 2021-05-30 02:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('flip', '0003_alter_freelance_pub_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialmedia',
            name='description',
            field=models.TextField(blank=True, max_length=240),
        ),
        migrations.AlterField(
            model_name='socialmedia',
            name='pub_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]